const express = require("express");
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/evm-utils");
const AuthRoutes = require("./routes/auth");
const NftRoutes = require("./routes/nft");
const userRoutes = require("./routes/user");
const utils = require("./utils/utils");
const Web3 = require("web3");
require("dotenv").config();

const app = express();
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS, PUT, DELETE, PATCH"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.use(AuthRoutes);
app.use(NftRoutes);
app.use(userRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

const startServer = async () => {
    await Moralis.start({
        apiKey: "jDpsBucRDfOFzklRwF4N71reCRZl1RdF7Qj9fyZhXEaSXTWsbni8zTg1imROXbGe",
    });
};

//moralis
const chain = utils.chain;
const address = "0xaFdD606dc2F29Fd4c02025F6F1AAE842322d0266";
const tokenId = 1;

mongoose
    .connect(process.env.MongoDB_URI)
    .then((result) => {
        app.listen(3000, () => {
            console.log("connected");
            startServer();
        });
    })
    .catch((error) => {
        console.log("cant connect to db");
    });

// app.listen(3000, () => {
//     console.log("listening on port 3000");
// });

// getDemoData();
