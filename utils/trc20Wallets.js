const tronwebModule = require('tronweb');
const TronWeb = tronwebModule.TronWeb || tronwebModule.default || tronwebModule;

const generateTrc20Wallet = async () => {
  const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io'
  });

  const account = await tronWeb.createAccount();

  return {
    address: account.address.base58,
    privateKey: account.privateKey,
    network: 'TRC20'
  };
};

module.exports = generateTrc20Wallet;
