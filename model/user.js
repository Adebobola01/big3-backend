const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String
    },
    created: [
        {
            contractAddr: {
                type: String,
                required: true,
                default: "",
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
