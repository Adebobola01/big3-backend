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
    try {
        if (await NFT.findOne({ imageUrl: req.body.imageUrl })) 
            res.status(400).json({ message: "nft already listed" })
        
        const nft = new NFT({
            contractAddr: req.body.tokenAddress,
            ownerAddress: req.address,
            price: Number(req.body.price),
            imageUrl: req.body.metadata.image,
            collectionName: req.body.name,
            expiryDate: Number(req.body.expiryDate),
            name: req.body.metadata.name,
            tokenId: Number(req.body.tokenId),
            tokenUri: req.body.tokenUri,
            symbol: req.body.symbol,
            description: req.body.metadata.description,
        });
        listedNFT = await nft.save();
        res.status(201).json({ message: "Nft created", data: listedNFT });
    } catch (error) {
        res.status(500).json({message: "could not list nft!", error: error})
    }
};
