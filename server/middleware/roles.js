const verifyToken = require("../middleware/accessAuth");
exports.isSuperAdmin = async (req, res, next) => {
  if (verifyToken && req.decoded.userRole === "SuperAdmin") {
    console.log(req.decoded);
    next();
  } else {
    return res
      .status(401)
      .json({ message: "You are not authorized to access this route" });
  }
};

exports.isAdmin = async (req, res, next) => {
  if (verifyToken && req.decoded.userRole === "Admin") {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "You are not authorized to access this route" });
  }
};
