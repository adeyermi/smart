const { Keypair } = require('@solana/web3.js');

const generateSolanaWallet = () => {
  const keypair = Keypair.generate();
  const privateKey = Buffer.from(keypair.secretKey).toString('hex');
  const publicKey = keypair.publicKey.toBase58();

  return {
    address: publicKey,
    privateKey,
    network: 'SOL'
  };
};

module.exports = generateSolanaWallet;
