const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nftSchema = new Schema({
    contractAddr: {
        type: String,
        required: true,
    },
    ownerAddress: {
        type: String,
        ref: "User",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    collectionName: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: Number,
    },
    name: {
        type: String,
        required: true,
    },
    tokenId: {
        type: Number,
    },
    tokenUri: {
        type: String,
    },
    symbol: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model("listed", nftSchema);
