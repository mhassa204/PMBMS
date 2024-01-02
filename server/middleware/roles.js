exports.isSuperAdmin = async (req, res, next) => {
  if (req.decoded.userType === "SuperAdmin") {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "You are not authorized to access this route" });
  }
};

exports.isAdmin = async (req, res, next) => {
  if (req.decoded.userType === "Admin") {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "You are not authorized to access this route" });
  }
};
