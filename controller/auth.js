const Web3 = require("web3");
const crypto = require("crypto");
const web3 = new Web3("http://localhost:8545");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const user = require("../model/user");
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

const clientId = '14229363422-sfgg82k2a80gbn4j9uld58td558fcjfe.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUrl = 'http://localhost:1234';
const SCOPES = ["email", "profile", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"];

const client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl, SCOPES);

exports.getCode = (req,res, next) => {
    const authUrl = client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    res.status(200).json({
        urlAuth: authUrl
    });
}

async function verify(_token) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: _token,
        audience:
          clientId
      });
      return ticket.getPayload();
    } catch (error) {
      throw createApiError("could not verify access token", 401);
    }
  }

exports.getAccessToken = async (req, res, next) => {
    try {   
        const code = req.body.code
        const { tokens } = await client.getToken(code);
        const payload = await verify(tokens.id_token)
    } catch (error) {
        console.log(error)
    } 
}

exports.verifyAddress = async (req, res, next) => {
    const address = req.body.address;

    let user = await User.findOne({ address: address });
    if (!user) {
        const newUser = new User({
            address: address,
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
        address: address,
        userId: user._id.toString(),
    });
};

exports.google = async (req, res, next) => {
    
}