const bitcoin = require('bitcoinjs-lib');
const ECPairFactory = require('ecpair').ECPairFactory;
const tinysecp = require('tiny-secp256k1');

const ECPair = ECPairFactory(tinysecp);

function generateBitcoinWallet(networkType = 'mainnet') {
  try {
    const network =
      networkType === 'testnet' ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;

    const keyPair = ECPair.makeRandom({ network });
    const pubkey = Buffer.from(keyPair.publicKey);
    const privateKey = keyPair.toWIF();

    const legacy = bitcoin.payments.p2pkh({ pubkey, network }).address;
    const segwit = bitcoin.payments.p2wpkh({ pubkey, network }).address;

    return {
      legacyAddress: legacy,
      segwitAddress: segwit,
      privateKey,
      network: networkType.toUpperCase(),
    };
  } catch (err) {
    console.error('Error generating Bitcoin wallet:', err);
    throw new Error('Error generating Bitcoin wallet');
  }
}

module.exports = generateBitcoinWallet;
