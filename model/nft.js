const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const nftSchema = new Schema({
    contractAddr: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

module.exports = mongoose.model("Nft", nftSchema);
