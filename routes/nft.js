const express = require("express");
const router = express.Router();
const nftController = require("../controller/nft");

router.get("/heroNft", nftController.getHeroNFTs);

module.exports = router;
