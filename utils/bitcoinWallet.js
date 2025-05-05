const bitcoin = require('bitcoinjs-lib');
const { randomBytes } = require('crypto');

const generateBitcoinWallet = () => {
  const keyPair = bitcoin.ECPair.makeRandom();
  const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey });
  const privateKey = keyPair.toWIF();

  return {
    address,
    privateKey,
    network: 'BTC'
  };
};

module.exports = generateBitcoinWallet;
