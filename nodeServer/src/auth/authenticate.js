const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, config.jwt_secret_key, (err, payLoad) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = payLoad.user;
    next();
  });
};
