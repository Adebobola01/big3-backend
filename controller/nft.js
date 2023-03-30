const utils = require("../utils/utils");
const morApis = require("../utils/moralis");
const chain = utils.chain;
const myAddress = "0xaFdD606dc2F29Fd4c02025F6F1AAE842322d0266";
const myTokenId = 1;
const big3 = require("../artifacts/contracts/Big3MarketPlace.sol/Big3Marketplace.json");
const Nft = require("../model/nft");

const { ethers } = require("ethers");
const { provider } = require("../server");

// async function getDemoData(address, tokenId) {
//     const response = await Moralis.EvmApi.nft.getNFTMetadata({
//         address,
//         chain,
//         tokenId,
//     });
//     return response.data.metadata;
// }

exports.getHeroNFTs = async (req, res, next) => {
    try {
        const nftData = await morApis.getDemoData(myAddress, myTokenId, chain);
        res.status(200).json({
            message: "nft fetched successfully!",
            data: nftData,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};


exports.createNft = async (req, res, next) => {
    const bn = provider.getBlockNumber()
    console.log(bn);
}