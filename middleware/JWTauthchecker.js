const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

const isJWTAuthorized = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) return res.status(401).send("access denied");

  try {
    const verified = jwt.verify(token, keys.jwtSecret);
    req.user = verified.user;
    next();
  } catch {
    res.status(400).send("Invalid Token");
  }
};

module.exports = {
  isJWTAuthorized,
};
