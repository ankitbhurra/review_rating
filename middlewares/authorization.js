//authorization middleware
function authorizeAdmin(req, res, next) {
  if (req.user && req.user.userRole === "admin") {
    next();
  } else {
    res.send({
      success: false,
      message: "you are not authorized for this action",
    });
  }
}

isUser = async (req, res, next) => {
  if (req.user && req.user.userRole === "user") {
    next();
  } else {
    res.send({
      success: false,
      message: "you are not authorize user",
    });
  }
};

module.exports = {
  authorizeAdmin,
  isUser,
};
