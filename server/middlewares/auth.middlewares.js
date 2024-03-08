const jwt = require("jsonwebtoken");

function isTokenValid(req, res, next) {
  try {
    const tokenArr = req.headers.authorization.split(" ");
    const token = tokenArr[1];
    const payload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.payload = payload;
    next();
  } catch (err) {
    res.status(401).json({ errMessage: "TOKEN no valido o expirado" });
  }
}

module.exports = { isTokenValid };
