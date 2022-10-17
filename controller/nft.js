const utils = require("../utils/utils");
const Moralis = require("moralis").default;

const chain = utils.chain;
const myAddress = "0xaFdD606dc2F29Fd4c02025F6F1AAE842322d0266";
const myTokenId = 1;

async function getDemoData(address, tokenId) {
    const response = await Moralis.EvmApi.nft.getNFTMetadata({
        address,
        chain,
        tokenId,
    });
    return response.data.metadata;
}

exports.getHeroNFTs = async (req, res, next) => {
    try {
        const nftData = await getDemoData(myAddress, myTokenId);
        console.log(nftData);
        res.status(200).json({
            message: "nft fetched successfully!",
            data: nftData,
        });
    } catch (error) {
        console.log("error");
        res.status(500).json({
            message: "nft could not be fetched for some reason",
        });
    }
};
