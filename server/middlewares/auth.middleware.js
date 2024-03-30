const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send({ message: "no token provided..." });

  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  if (decoded) {
    const userId = decoded.userId;
    req.body.userId = userId;
    next();
  } else {
    return res.status(500).send({ message: "token is not valid" });
  }
};

module.exports = { authenticate };
