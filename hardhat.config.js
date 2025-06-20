require("@nomicfoundation/hardhat-toolbox");


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.26",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0xa2c716a97d7358bef6d07e38c400c7e1122a553cff0faee2b3cfe998526af425"],  //separate file for private keys is not created for now.
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/zYXYMKxrbAUyxcUVzvnDLyRVpMMTlUBT",
      accounts: ["bab9e9925e22c49a25b553635c91e59bdf3acec35984f2055e629ce0c7f38e53"]
    }
  }
};