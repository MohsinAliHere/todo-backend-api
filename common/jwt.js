const jwt = require("jsonwebtoken");
const signToken = (id) => {
  return jwt.sign(id, process.env.PRIVATEKEY);
};
const verifyToken =  (id) => {
  return jwt.verify(id, process.env.PRIVATEKEY);
};

module.exports = {
  signToken,
  verifyToken,
};
