
const checkAllowedRoles = (allowedRoles) => (req, res, next) => {
  if (global.auth === false) return next();

    const userRole = req.user?.rol; // Assuming `req.user` contains user info
  if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({ message: 'Acceso denegado' });
  }
  next();
};

export default checkAllowedRoles;