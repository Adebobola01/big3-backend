const express = require("express");
const router = express.Router();
const {getHeroNFTs, createNft, getExploreNfts, getNftDetails} = require("../controller/nft");

router.get("/heroNft", getHeroNFTs);
router.post("/createNft", createNft);
router.get("/explore", getExploreNfts);
router.post("/getNftDetails", getNftDetails)

module.exports = router;
