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
}

module.exports = usersServices;
