const Web3 = require('web3');
const web3 = new Web3();

const generateEthereumWallet = () => {
  const account = web3.eth.accounts.create();
  return {
    address: account.address,
    privateKey: account.privateKey,
    network: 'ETH'
  };
};

module.exports = generateEthereumWallet;
