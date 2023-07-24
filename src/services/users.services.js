// const bcrypt = require("bcrypt");
// const { createNewUserREPO } = require("../repositories/users.repositories");

// const createNewUserSRVC = async (username, email, password) => {
//   try {
//     const hashed = await bcrypt.hash(password, 10);
//     await createNewUserREPO({ username, email, password: hashed });
//   } catch (err) {
//     throw err;
//   }
// };

// module.exports = {
//   createNewUserSRVC,
// };
const { createNewUserREPO } = require("../repositories/users.repositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { sendWelcomeMail } = require("../utils/sendMails");
const { users } = require("../models");

class usersServices {
  static async createNewUserSRVC(username, email, password) {
    try {
      const hashed = await bcrypt.hash(password, 10);
      await createNewUserREPO({ username, email, password: hashed });
      const verifyToken = jwt.sign(
        { username, email },
        process.env.JWT_SECRET_EMAIL_VALIDATION,
        {
          algorithm: "HS512",
          expiresIn: "48h",
        }
      );
      sendWelcomeMail(email, { username, verifyToken });
    } catch (err) {
      throw err;
    }
  }

  static async loginSRVC(email, password) {
    try {
      const user = await users.findOne({
        where: { email },
      });

      if (!user) {
        throw {
          status: 400,
          name: "Invalid email",
          message: "email doesn't exist",
        };
      }

      if (!user.valid_user) {
        throw {
          status: 400,
          name: "Email is not verified",
          message: "user has not verified his email",
        };
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw {
          status: 400,
          name: "Invalid password",
          message: "Your password doesn't match with user email",
        };
      }

      const { id, username, avatar, role_id } = user;

      const userData = { id, username, email, password, avatar, role_id };

      const token = jwt.sign(userData, process.env.JWT_SECRET_LOGIN, {
        algorithm: "HS512",
        expiresIn: "5m",
      });

      userData.token = token;

      return userData;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = usersServices;
