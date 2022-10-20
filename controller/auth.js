let address;
const Web3 = require("web3");
const crypto = require("crypto");
const web3 = new Web3(Web3.givenProvider);
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const user = require("../model/user");

exports.getMessage = (req, res, next) => {
    address = req.body.address;
    const message = crypto.randomBytes(20).toString("hex");
    res.status(200).json({
        message: message,
    });
};

exports.verifyAddress = async (req, res, next) => {
    const message = req.body.message;
    const signature = req.body.signature;
    const verifiedAddr = await web3.eth.accounts.recover(message, signature);
    const verifiedAddress = verifiedAddr.toLowerCase();

    //CHECK IF ADDRESSES MATCH
    try {
        if (address !== verifiedAddress) {
            res.status(401).json({
                message: "error verifiying address",
            });
        }

        const user = await User.findOne({ address: verifiedAddress });
        if (!user) {
            const newUser = new User({
                address: verifiedAddress,
            });
            user = await newUser.save();
        }

        //CREATE AUTH TOKEN
        const token = jwt.sign(
            {
                address: user.address,
                userId: user._id.toString(),
            },
            "big3AuthSignatureVeryImportant",
            {
                expiresIn: "24h",
            }
        );

        res.status(200).json({
            token: token,
            message: "address is verified",
            address: verifiedAddr,
            userId: user._id.toString(),
        });
    } catch (error) {
        console.log(error, "check user error");
    }
};
