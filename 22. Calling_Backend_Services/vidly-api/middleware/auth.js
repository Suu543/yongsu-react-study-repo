const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  if (!process.env.requiresAuth) return next();

  const token = req.header("x-auth-token");
  // Client doesn't have client credential
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    // users model에서 jwt를 생성할 때 사용한 payload 값을 req.user에 붙여줍니다.
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
