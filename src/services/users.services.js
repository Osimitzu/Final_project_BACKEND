const { createNewUserREPO } = require("../repositories/users.repositories");

class usersServices {
  static async createNewUserSRVC(newUser) {
    try {
      const user = await createNewUserREPO(newUser);
      return user;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = usersServices;
