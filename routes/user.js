const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const isAuth = require("../middleware/auth");

// router.post("/profile", isAuth, userController.getUserData);
// router.post("/list", isAuth, userController.listNft);

router.post("/profile", isAuth, userController.getUserData);
router.post("/list", isAuth, userController.listNft);

module.exports = router;
