const express = require("express");
const router = express.Router();
const {getHeroNFTs, createNft} = require("../controller/nft");

router.get("/heroNft", getHeroNFTs);
router.get("/createNft", createNft);

module.exports = router;
