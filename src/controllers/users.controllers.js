const usersServices = require("../services/users.services");
const jwt = require("jsonwebtoken");
const { users } = require("../models");
require("dotenv").config();
const path = require("path");
const multer = require("multer");
const types = ["image/jpeg", "image/png"];
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const absolutePath = path.resolve("./src/views/profilePictures");
      cb(null, absolutePath);
    },
    filename: (req, file, cb) => {
      const date = Date.now();
      cb(null, `${date}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // 1000 KyloBytes o un mega aprox
  },
  fileFilter: (req, file, cb) => {
    // Solo aceptaremos archivos .jpeg y .png

    if (!types.includes(file.mimetype)) {
      cb(
        {
          error: "file not supported",
          message: `Only ${types.join(", ")} mimetypes are allowed`,
        },
        false
      );
    } else {
      cb(null, true);
    }
  },
});

const createNewUserCTRL = async (req, res, next) => {
  try {
    // Extrae la información del usuario del cuerpo de la solicitud
    const { username, email, password } = req.body;

    // Llama al servicio para crear un nuevo usuario con la información proporcionada
    await usersServices.createNewUserSRVC(username, email, password);

    // Responde con un estado HTTP 201 (Creado) para indicar que el usuario se ha creado con éxito
    res.status(201).send();
  } catch (err) {
    // Si se produce un error durante la creación del usuario, pasa el error al siguiente middleware
    next(err);
  }
};

const validateEmail = async (req, res, next) => {
  try {
    // Obtiene el token de la consulta de la solicitud
    const { token } = req.query;

    // Verifica el token utilizando la clave secreta JWT para validar el correo electrónico
    const decoded = jwt.verify(token, process.env.JWT_SECRET_EMAIL_VALIDATION, {
      algorithms: "HS512",
    });

    // Si no se puede verificar el token, se envía un error al siguiente middleware
    if (!decoded) {
      next({
        status: 400,
        name: "verification error",
        message: "something occurred during verification, please request again",
      });
    }

    // Actualiza el estado de valid_user a true en la base de datos para el correo electrónico decodificado
    await users.update(
      { valid_user: true },
      {
        where: { email: decoded.email },
      }
    );

    // Responde con un estado HTTP 204 (Sin contenido) para indicar que la validación fue exitosa
    res.status(204).send();
  } catch (err) {
    // Si se produce un error durante la validación, pasa el error al siguiente middleware
    next(err);
  }
};

const loginCTRL = async (req, res, next) => {
  try {
    // Obtiene el correo electrónico y la contraseña del cuerpo de la solicitud
    const { email, password } = req.body;

    // Llama al servicio para realizar la autenticación del usuario utilizando el correo electrónico y la contraseña
    const userData = await usersServices.loginSRVC(email, password);

    // Responde con los datos del usuario autenticado en formato JSON
    res.json(userData);
  } catch (err) {
    // Si se produce un error durante el proceso de inicio de sesión, pasa el error al siguiente middleware
    next(err);
  }
};

// Delete user controller v1
// const deleteUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const user = await users.findOne({
//       where: { id },
//     });

//     if (!user) {
//       next({
//         status: 400,
//         name: "Invalid user",
//         message: "User doesn't exist",
//       });
//     }

//     await cars.destroy({
//       where: { user_id: id },
//     });

//     await users.destroy({
//       where: { id },
//     });

//     res.status(201).send("User deleted");
//   } catch (err) {
//     next(err);
//   }
// };

const deleteUserCTRL = async (req, res, next) => {
  try {
    // Obtiene el ID del usuario a eliminar de los parámetros de la solicitud
    const { id } = req.params;

    // Llama al servicio para eliminar al usuario con el ID proporcionado
    await usersServices.deleteUserSRVC(id);

    // Responde con un estado HTTP 200 (Éxito) y un mensaje indicando que el usuario ha sido eliminado
    res.status(200).send("User deleted");
  } catch (err) {
    // Si se produce un error durante la eliminación del usuario, pasa el error al siguiente middleware
    next(err);
  }
};

// const updateRoleCTRL = async (req, res, next) => {
//   try {
//     const { role_id } = req.body;
//     const { id } = req.params;

//     const user = await users.findOne({
//       where: { id },
//     });

//     if (!user) {
//       next({
//         status: 400,
//         name: "Invalid user",
//         message: "User doesn't exists",
//       });
//     }

//     await users.update(
//       {
//         role_id,
//       },
//       {
//         where: { id },
//       }
//     );

//     res.status(201).send("Role has chaged");
//   } catch (err) {
//     next(err);
//   }
// };

const updateRoleCTRL = async (req, res, next) => {
  try {
    // Obtiene el ID de rol y el ID de usuario de los parámetros y el cuerpo de la solicitud
    const { role_id } = req.body;
    const { id } = req.params;

    // Llama al servicio para actualizar el rol del usuario con el ID proporcionado
    const message = await usersServices.updateRoleSRVC(id, role_id);

    // Responde con un estado HTTP 200 (Éxito) y un mensaje que indica que se ha actualizado el rol del usuario
    res.status(200).send(message);
  } catch (err) {
    // Si se produce un error durante la actualización del rol, pasa el error al siguiente middleware
    next(err);
  }
};

const updateUserInfoCTRL = async (req, res, next) => {
  try {
    // Obtiene el ID de usuario y el nombre de usuario del cuerpo de la solicitud
    const { id } = req.params;
    const { username } = req.body;

    // Middleware Multer: procesa la carga de archivos (avatar) si está presente en la solicitud
    upload.single("avatar")(req, res, async (err) => {
      if (err) {
        return next(err);
      }

      // Obtiene el nombre de archivo del avatar (si se proporciona)
      const avatar = req.file ? req.file.filename : undefined;

      // Llama al servicio para actualizar la información del usuario con el ID y el nombre de usuario proporcionados, junto con el avatar (si se proporciona)
      const message = await usersServices.updateUserInfoSRVC(
        id,
        username,
        avatar
      );

      // Responde con un estado HTTP 200 (Éxito) y un mensaje que indica que se ha actualizado la información del usuario
      res.status(200).send(message);
    });
  } catch (err) {
    // Si se produce un error durante la actualización de la información del usuario, pasa el error al siguiente middleware
    next(err);
  }
};

const passwordResetCTRL = async (req, res, next) => {
  try {
    // Obtiene la dirección de correo electrónico del cuerpo de la solicitud
    const { email } = req.body;

    // Llama al servicio para iniciar el proceso de restablecimiento de contraseña utilizando la dirección de correo electrónico proporcionada
    await usersServices.passwordResetSRVC(email);

    // Responde con un estado HTTP 200 (Éxito) y un mensaje que indica al usuario que verifique su correo electrónico para restablecer la contraseña
    res.status(200).send("Please check out your email to reset your password");
  } catch (err) {
    // Si se produce un error durante el proceso de restablecimiento de contraseña, pasa el error al siguiente middleware
    next(err);
  }
};

module.exports = {
  createNewUserCTRL,
  validateEmail,
  loginCTRL,
  deleteUserCTRL,
  updateRoleCTRL,
  updateUserInfoCTRL,
  passwordResetCTRL,
};
