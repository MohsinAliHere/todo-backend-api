const { register, login, checkAuth } = require("../controllers/auth");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/checkAuth", checkAuth);

module.exports = router;
