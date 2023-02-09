const express = require("express");
const UserController = require("../controllers/userController");
const router = express();

router.post("/register", UserController.register);
router.get("/verify", UserController.verifyAccount);
router.post("/login", UserController.login);

module.exports = router;
