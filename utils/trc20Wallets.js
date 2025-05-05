const TronWeb = require('tronweb');

const generateTrc20Wallet = () => {
  const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });

  const account = tronWeb.utils.accounts.generateAccount();

  return {
    address: account.address.base58,
    privateKey: account.privateKey,
    network: 'TRC20'
  };
};

module.exports = generateTrc20Wallet;
