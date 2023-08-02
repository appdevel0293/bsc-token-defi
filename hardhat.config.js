require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const mnemonic = process.env.MNEMONIC;
const QUICKNODE_RPC = process.env.QUICKNODE_RPC;




/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "testnet",
  networks:{
    testnet:{
      url: QUICKNODE_RPC,
      chainId: 97,
      gasPrice: 20000000000,
      accounts: {mnemonic:mnemonic}

    }
  }
};
