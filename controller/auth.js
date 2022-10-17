let address;

exports.getMessage = (req, res, next) => {
    address = req.body.address;
    const message = crypto.randomBytes(20).toString("hex");
    console.log("mes");
    res.status(200).json({
        message: message,
    });
};

exports.verifyAddress = async (req, res, next) => {
    console.log("here");
    const message = req.body.message;
    const signature = req.body.signature;
    const verifiedAddr = await web3.eth.accounts.recover(message, signature);
    console.log(verifiedAddr.toLowerCase());
    if (address === verifiedAddr.toLowerCase()) {
        console.log("worked");
        res.status(200).json({
            message: "address is verified",
            address: verifiedAddr,
        });
    } else {
        res.status(401).json({
            message: "error verifiying address",
        });
    }
};
