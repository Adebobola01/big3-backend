const { json } = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: true,
    },
    created: {
        nfts: [
            {
                contractAddr: {
                    type: String,
                    ref: "Nft",
                    required: true,
                },
                metaData: {
                    type: JSON,
                    required: true,
                },
            },
        ],
    },
    collected: {
        nfts: [
            {
                contractAddr: {
                    type: String,
                    ref: "Nft",
                    required: true,
                },
                metaData: {
                    type: JSON,
                    required: true,
                },
            },
        ],
    },
    listed: {
        nfts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Nft",
            },
        ],
    },
});

module.exports = mongoose.model("User", UserSchema);
