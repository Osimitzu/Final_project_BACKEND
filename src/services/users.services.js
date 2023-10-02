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
const { users, cars } = require("../models");
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

class usersServices {
  static async createNewUserSRVC(username, email, password) {
    try {
      // Genera un hash de la contraseña del usuario para almacenarla de manera segura en la base de datos
      const hashed = await bcrypt.hash(password, 10);

      // Llama a la función de repositorio para crear un nuevo usuario con la información proporcionada
      await createNewUserREPO({ username, email, password: hashed });

      // Genera un token de verificación de correo electrónico para el nuevo usuario
      const verifyToken = jwt.sign(
        { username, email },
        process.env.JWT_SECRET_EMAIL_VALIDATION,
        {
          algorithm: "HS512",
          expiresIn: "48h",
        }
      );

      // Envía un correo de bienvenida al nuevo usuario, incluyendo el token de verificación
      sendWelcomeMail(email, { username, verifyToken });
    } catch (err) {
      // Si se produce un error durante la creación del nuevo usuario, se lanza el error
      throw err;
    }
  }

  static async loginSRVC(email, password) {
    try {
      // Busca al usuario en la base de datos utilizando el correo electrónico proporcionado
      const user = await users.findOne({
        where: { email },
      });

      // Busca el automóvil asociado al usuario
      const car = await cars.findOne({
        where: { user_id: user.id },
      });

      // Comprueba si el usuario existe
      if (!user) {
        // Si el usuario no existe, lanza un error de autenticación no autorizada
        throw {
          status: 401,
          name: "Unauthorized",
          message: "Invalid email or password",
        };
      }

      // VERIFICACION DESACTIVADA TEMPORALMENTE
      // if (!user.valid_user) {
      //   throw {
      //     status: 401,
      //     name: "Email is not verified",
      //     message: "user has not verified his email",
      //   };
      // }

      // Verifica si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
      const validPassword = await bcrypt.compare(password, user.password);

      // Si la contraseña no es válida, lanza un error de autenticación no autorizada
      if (!validPassword) {
        throw {
          status: 401,
          name: "Unauthorized",
          message: "Invalid email or password",
        };
      }

      // Extrae información relevante del usuario para crear un objeto de datos de usuario
      const { id, username, avatar, role_id } = user;

      // Crea un objeto de datos de usuario con información relevante
      const userData = {
        id,
        username,
        email,
        avatar,
        role_id,
        car_id: car.id,
      };

      // Genera un token JWT para autenticar al usuario y establece su vigencia
      const token = jwt.sign(userData, process.env.JWT_SECRET_LOGIN, {
        algorithm: "HS512",
        expiresIn: "60m",
      });

      // Asigna el token JWT al objeto de datos de usuario
      userData.token = token;

      // Retorna los datos de usuario incluyendo el token
      return userData;
    } catch (err) {
      // Si se produce un error durante el proceso de inicio de sesión, se lanza el error
      throw err;
    }
  }

  static async deleteUserSRVC(id) {
    try {
      // Busca al usuario en la base de datos utilizando el ID proporcionado
      const user = await users.findOne({
        where: { id },
      });

      // Comprueba si el usuario existe
      if (!user) {
        // Si el usuario no existe, lanza un error indicando que el usuario no existe
        throw {
          status: 400,
          name: "Invalid user",
          message: "User doesn't exist",
        };
      }

      // Llama a la función de repositorio para eliminar al usuario con el ID proporcionado
      await deleteUserREPO(id);
    } catch (err) {
      // Si se produce un error durante la eliminación del usuario, se lanza el error
      throw err;
    }
  }

  static async updateRoleSRVC(id, role_id) {
    try {
      // Busca al usuario en la base de datos utilizando el ID proporcionado
      const user = await users.findOne({
        where: { id },
      });

      // Comprueba si el usuario existe
      if (!user) {
        // Si el usuario no existe, lanza un error indicando que el usuario no existe
        throw {
          status: 400,
          name: "Invalid user",
          message: "User doesn't exist",
        };
      }

      // Llama a la función de repositorio para actualizar el rol del usuario con el ID proporcionado
      await updateRoleREPO(id, role_id);

      // Retorna un mensaje indicando que se ha actualizado el rol
      return "Role has been updated";
    } catch (err) {
      // Si se produce un error durante la actualización del rol, se lanza el error
      throw err;
    }
  }

  static async updateUserInfoSRVC(id, username, avatar) {
    try {
      // Moví la validación de que exista el usuario al controlador para poder usar el middleware de MULTER sin que crashee la aplicación en caso de que el usuario no exista.

      // Llama a la función de repositorio para actualizar la información del usuario con el ID, nombre de usuario y avatar proporcionados
      await updateUserInfoREPO(id, username, avatar);

      // Retorna un mensaje indicando que se ha actualizado la información del usuario
      return "Info has been updated";
    } catch (err) {
      // Si se produce un error durante la actualización de la información del usuario, se lanza el error
      throw err;
    }
  }

  static async passwordResetSRVC(email) {
    // Llama a la función de repositorio para obtener información del usuario asociado al correo electrónico proporcionado
    const user = await passwordResetREPO(email);

    // Comprueba si el usuario existe en la base de datos
    if (!user) {
      // Si el usuario no existe, lanza un error indicando que el usuario no existe
      throw {
        error: "Invalid user",
        message: "User doesn't exist",
      };
    }

    // Llama a la función para enviar un correo electrónico de restablecimiento de contraseña al usuario
    await sendPasswordResetMail(email);
  }
}

module.exports = usersServices;
