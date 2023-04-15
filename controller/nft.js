const utils = require("../utils/utils");
const morApis = require("../utils/moralis");
const chain = utils.chain;
const myAddress = "0xaFdD606dc2F29Fd4c02025F6F1AAE842322d0266";
// const myAddress = "00x3427bfe887eEc6E1C1e0F2b485800B5A9A7c633F";
const myTokenId = 1;
const big3 = require("../artifacts/contracts/Big3MarketPlace.sol/Big3Marketplace.json");
const Nft = require("../model/nft");
// const { ethers, JsonRpcProvider } = require("ethers");
const User = require("../model/user");

let provider;
let signer;
// const getProvider = async () => {
//     try {
//         provider = new ethers.JsonRpcApiProvider();
//         signer = await provider.getSigner();
//     } catch (error) {
//         console.log(error)
//     }
// }
// getProvider();
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
    // const contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", big3.abi, signer);
    // const tx = await contract.mint();
    // await tx.wait();
    // console.log(tx);

    const data = req.body.data;
    const user = await User.findOne({ address: req.address });
    console.log(data)
    // user.created.push(data);
}

exports.getExploreNfts = async (req, res, next) => {
    const nfts = await Nft.find().exec();
    res.status(200).json({nfts: nfts, message: "nfts found successfully!"})
}

exports.getNftDetails = async (req, res, next) => {
    const nft = await Nft.findOne({ contractAddr: req.body.contractAddress, tokenId: req.body.tokenId });
    res.status(200).json({message: "nft details loaded successfully", nft: nft})
    console.log(nft);
}