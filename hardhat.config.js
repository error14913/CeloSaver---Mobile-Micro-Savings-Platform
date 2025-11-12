import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY?.trim();

if (!PRIVATE_KEY) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}

const config = {
  solidity: "0.8.20",
  networks: {
    celosepolia: {
      url: "https://forno.celo-sepolia.celo-testnet.org",
      accounts: [PRIVATE_KEY],
      chainId: 11142220,
      gas: 2100000,
      gasPrice: 30000000000,
    },
  },
};

export default config;