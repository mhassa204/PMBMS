const consoleLogMiddleware = (allowedUsers) => {
    return (req , res , next) => {
  const user = req.body.user;

  if (allowedUsers.includes(user)) {
    console.log("Access granted." + "to " + user);
    next();
  } else {
    console.log("User is not ahmed. Access denied.");
    // You can choose to send an error response or redirect the user to another page here
    res.json({ message: "Access denied" });
  }
}
};

module.exports = consoleLogMiddleware;

