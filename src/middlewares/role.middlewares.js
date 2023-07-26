// hasRoles --> va a dejar pasar los siguientes roles...
// recibe un arreglo de roles
// hasRoles(2, 3, 5)
const hasRoles = (...roles) => {
  // devolver una función de middleware
  return (req, res, next) => {
    const { role_id, username } = req.user;
    if (!roles.includes(role_id)) {
      next({
        status: 401,
        name: "Role required",
        message: `Sorry ${username} only admins can access here`,
      });
    }
    next();
  };
};

module.exports = hasRoles;
