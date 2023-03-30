require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: process.env.HTTP_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    ganache: {
      url: process.env.GANACHE_URL,
      accounts: [process.env.GANACHE_KEY]
    }
  }
};
