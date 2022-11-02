const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nftSchema = new Schema({
    contractAddr: {
        type: String,
        required: true,
    },
    ownerAddress: {
        type: String,
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
    duration: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Nft", nftSchema);
