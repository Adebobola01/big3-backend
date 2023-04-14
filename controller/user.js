const utils = require("../utils/utils");
const morApi = require("../utils/moralis");
const NFT = require("../model/nft");
const User = require("../model/user");

const getHours = (value, unit) => {
    if (unit === "hours") return Number(value);
    else if (unit === "days") return Number(value) * 24;
    else if (unit === "weeks") return Number(value) * 24 * 7;
    else if (unit === "months") return Number(value) * 30 * 24;
};

exports.getUserData = async (req, res, next) => {
    try {
        const addressNfts = [];
        const userAddr = req.body.userAddress;
        const { data } = await morApi.getNfts(userAddr, utils.chain);
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
        res.status(500).json({
            message: "could not fetch user nft"
        })
    }
};

exports.listNft = async (req, res, next) => {
    console.log(req.body)
    try {
        if (await NFT.findOne({ imageUrl: req.body.imageUrl })) 
            res.status(400).json({ message: "nft already listed" })
        
        const duration = getHours(
            req.body.durationValue,
            req.body.durationUnit
        );
        console.log(req.body);
        const nft = new NFT({
            contractAddr: req.body.contractAddr,
            ownerAddress: req.address,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            collectionName: req.body.collection,
            duration: duration,
            name: req.body.name,
        });
        listedNFT = await nft.save();
        const user = await User.findOne({ address: req.address });
        user.listed.nfts.push(listedNFT._id);
        user.save();
        console.log(listedNFT, "NFT listed!");
        res.status(201).json({ message: "Nft created", data: listedNFT });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
            next(error);
        }
        next(error);
    }
};
