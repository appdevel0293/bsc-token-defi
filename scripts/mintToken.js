const { ethers } = require("hardhat");

const tokenAddress = "0x46EDBa82BB3F65d0f5Ec448076836B917c1b0539";
const lockAddress = "0x295c77358BB4518Ff9d45C644C567B7fd4D42bdD";;
 
async function main() {

    const amount = hre.ethers.parseEther("1000");

    const MiToken = await ethers.getContractFactory("MyToken");
    const token = await MiToken.attach(tokenAddress);

    let tx = await token.mint(lockAddress, amount);
    await tx.wait();

    let balance = await token.balanceOf(lockAddress);
    console.log("Balance of LockTocken", ethers.formatEther(balance));
}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });