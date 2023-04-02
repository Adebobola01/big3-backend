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
    created: [
        {
            contractAddr: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            imageUrl: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            traits: {
                type: Array,
                required: true,
            }
        },
    ],
});

module.exports = mongoose.model("User", UserSchema);
