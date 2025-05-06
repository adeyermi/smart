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

// Run and print the generated wallet
(async () => {
  try {
    const wallet = await generateTrc20Wallet();
    console.log("Generated TRC20 Wallet:");
    console.log(wallet);
  } catch (error) {
    console.error("Error generating TRC20 wallet:", error);
  }
})();
