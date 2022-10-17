const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
    },
    created: {
        nfts: [
            {
                contractAddr: {
                    type: String,
                    ref: "Nft",
                    required: true,
                },
            },
        ],
    },
});

module.exports = mongoose.model("user", UserSchema);
