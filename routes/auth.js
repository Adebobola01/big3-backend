const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();

router.post("/message", authController.getMessage);
router.post("/verify", authController.verifyAddress);

module.exports = router;
