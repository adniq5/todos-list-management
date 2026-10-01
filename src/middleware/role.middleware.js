const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // Pastikan user sudah melewati auth middleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User belum terautentikasi",
      });
    }

    // Cek apakah role user diizinkan
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Akses ditolak",
      });
    }

    next();
  };
};

module.exports = roleMiddleware;