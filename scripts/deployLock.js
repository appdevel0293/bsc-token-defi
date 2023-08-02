
//TokenLock deployed to: 0x295c77358BB4518Ff9d45C644C567B7fd4D42bdD

const { ethers } = require("hardhat");

async function main() {

    const TokenLock = await ethers.getContractFactory("TokenLock");
  
    // Only pass token address
    const tokenAddress = "0x46EDBa82BB3F65d0f5Ec448076836B917c1b0539";
  
    console.log("Deploying TokenLock...");
  
    const tokenLockDeployed = await TokenLock.deploy(tokenAddress);

    await tokenLockDeployed.waitForDeployment();

    console.log("TokenLock deployed to:", tokenLockDeployed.target);
  
  }

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });