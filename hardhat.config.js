require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url:'https://eth-goerli.g.alchemy.com/v2/0wYskrCHxh_DcgNZ6hB3bpgnIVAfsAWt',
      accounts:[process.env.privateKey]
    }
}
};
