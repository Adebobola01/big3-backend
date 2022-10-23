const utils = require("../utils/utils");
const morApis = require("../utils/moralis");
const chain = utils.chain;
const myAddress = "0xaFdD606dc2F29Fd4c02025F6F1AAE842322d0266";
const myTokenId = 1;

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
        console.log("hero");
        const nftData = await morApis.getDemoData(myAddress, myTokenId, chain);
        console.log(nftData);
        res.status(200).json({
            message: "nft fetched successfully!",
            data: nftData,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "nft could not be fetched for some reason",
        });
    }
};
