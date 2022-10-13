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
                    required: true,
                },
            },
        ],
    },
});
