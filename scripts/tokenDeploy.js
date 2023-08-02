//Token deployed to 0x46EDBa82BB3F65d0f5Ec448076836B917c1b0539

const { ethers } = require("hardhat");


async function main(){

    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with account:", deployer.address); 

    const balanceBigNumber = await deployer.provider.getBalance(deployer.address);
    const balance = ethers.formatEther(balanceBigNumber);
    console.log("Account deployer balance: ", balance);

    const amount = ethers.parseEther("1000000"); 

    const MyToken = await ethers.getContractFactory("MyToken");
    const token = await MyToken.deploy("SimplePanas", "SP", amount);

    await token.waitForDeployment();

    const totalSupply = await token.totalSupply();
    console.log(
        `Token deployed to ${token.target} with an initialSupply ${ethers.formatEther(totalSupply)}`
    );

    const balanceBigNumberAfter = await deployer.provider.getBalance(deployer.address);
    const balanceAfter = ethers.formatEther(balanceBigNumberAfter);
    console.log("Account deployer balance after deploy: ", balanceAfter);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });