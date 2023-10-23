const jwt = require("jsonwebtoken");

const tokenAuthentication = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  console.log("authHeader:", authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    let token = authHeader.split(" ")[1]; //![1] islye likha h quki [0] pr
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: false,
          message: "user is not authorize",
        });
      } else {
        req.user = decoded.userData; // log in user details , decode this value
        next();
      }
    });
  } else {
    res.status(409).json({
      success: false,
      message: "token not found",
    });
  }
};
module.exports = {
  tokenAuthentication,
};
