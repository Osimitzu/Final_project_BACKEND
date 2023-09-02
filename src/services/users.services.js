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
const {
  createNewUserREPO,
  updateRoleREPO,
  deleteUserREPO,
  updateUserInfoREPO,
  passwordResetREPO,
} = require("../repositories/users.repositories");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  sendWelcomeMail,
  sendPasswordResetMail,
} = require("../utils/sendMails");
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
        expiresIn: "60m",
      });

      userData.token = token;

      return userData;
    } catch (err) {
      throw err;
    }
  }

  static async deleteUserSRVC(id) {
    try {
      const user = await users.findOne({
        where: { id },
      });

      if (!user) {
        throw {
          status: 400,
          name: "Invalid user",
          message: "User doesn't exist",
        };
      }

      await deleteUserREPO(id);
    } catch (err) {
      throw err;
    }
  }

  static async updateRoleSRVC(id, role_id) {
    try {
      const user = await users.findOne({
        where: { id },
      });

      if (!user) {
        throw {
          status: 400,
          name: "Invalid user",
          message: "User doesn't exist",
        };
      }

      await updateRoleREPO(id, role_id);

      return "Role has been changed";
    } catch (err) {
      throw err;
    }
  }

  static async updateUserInfoSRVC(id, username, avatar) {
    try {
      // Moví la validación de que exista el usuario al controlador para poder usar el middleware de MULTER sin que crashee la aplicación en caso de que el usuario no exista.

      await updateUserInfoREPO(id, username, avatar);

      return "Info has been updated";
    } catch (err) {
      throw err;
    }
  }

  static async passwordResetSRVC(email) {
    const user = await passwordResetREPO(email);

    if (!user) {
      throw {
        error: "Invalid user",
        message: "User doesn't exist",
      };
    }

    await sendPasswordResetMail(email);
  }
}

module.exports = usersServices;
