const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.sendError("Token not found", 400);
    } else {
      jwt.verify(token, process.env.PRIVATEKEY, (err, decode) => {
        if (err) {
          return res.sendError("Invalid token", 400);
        }
        res.userId = decode.id;
      });
    }
    next();
  } catch (error) {
    return res.sendError(error.message, 500);
  }
};

module.exports = verifyToken;
