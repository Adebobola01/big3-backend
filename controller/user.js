const utils = require("../utils/utils");
const morApi = require("../utils/moralis");

exports.getUserData = async (req, res, next) => {
    try {
        const addressNfts = [];
        const userAddr = req.body.userAddress;
        const { data } = await morApi.getNfts(userAddr, utils.chain);
        console.log(data.result);
        data.result.forEach((n) => {
            const nft = {};
            nft.metadata = JSON.parse(n.metadata);
            nft.tokenId = n.token_id;
            nft.contractType = n.contract_type;
            nft.name = n.name;
            nft.symbol = n.symbol;
            nft.tokenAddress = n.token_address;
            nft.tokenUri = n.token_uri;
            addressNfts.push(nft);
        });
        res.status(200).json({
            data: addressNfts,
            message: "User data fetched successfully!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            data: [],
            message: "sorry we could not fetch your data at this time!",
        });
    }
};
