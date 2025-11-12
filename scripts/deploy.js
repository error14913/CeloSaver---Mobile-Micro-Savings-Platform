import hre from "hardhat";

async function main() {
  console.log("Deploying CeloSaver to Celo Sepolia Testnet...");

  const CeloSaver = await hre.ethers.getContractFactory("CeloSaver");
  const celoSaver = await CeloSaver.deploy();

  await celoSaver.waitForDeployment();

  const address = await celoSaver.getAddress();
  console.log("CeloSaver deployed to:", address);
  console.log("View on explorer: https://sepolia.celoscan.io/address/" + address);
}

main().catch((error) => {
  console.error("Deployment failed:", error);
  process.exitCode = 1;
});