const { register, login, checkAuth } = require("../controllers/auth");
const verifyToken = require("../middleware/verifyToken");
const router = require("express").Router();


// auth routes
router.post("/register", register);
router.post("/login", login);
router.get("/checkAuth", verifyToken , checkAuth);

module.exports = router;
