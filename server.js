const express = require("express");
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/evm-utils");
const AuthRoutes = require("./routes/auth");
const utils = require("./utils/utils");

const app = express();
const bodyParser = require("body-parser");

const Web3 = require("web3");
const crypto = require("crypto");

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

const startServer = async () => {
    await Moralis.start({
        apiKey: "jDpsBucRDfOFzklRwF4N71reCRZl1RdF7Qj9fyZhXEaSXTWsbni8zTg1imROXbGe",
    });
};

//moralis
const chain = utils.chain;
const address = "0xb00492a72557b778CB31270E78D27716d6340BbF";
const tokenId = 5;

async function getDemoData() {
    const response = await Moralis.EvmApi.nft.getNFTMetadata({
        address,
        chain,
        tokenId,
    });
    console.log(response);
}

app.listen(3000, () => {
    console.log("listening on port 3000");
});

startServer();

getDemoData();
