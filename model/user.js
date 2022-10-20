const { json } = require("express");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
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
});

module.exports = mongoose.model("user", UserSchema);
