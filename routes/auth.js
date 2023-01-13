const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();

router.post("/message", authController.getMessage);
router.post("/verify", authController.verifyAddress);
router.get("/getUrl", authController.getCode)
router.post("/googleCode", authController.getAccessToken)

module.exports = router;
