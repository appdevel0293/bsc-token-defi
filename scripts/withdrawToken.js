const { ethers } = require("hardhat");

const tokenAddress = "0x46EDBa82BB3F65d0f5Ec448076836B917c1b0539";
const lockAddress = "0x295c77358BB4518Ff9d45C644C567B7fd4D42bdD";  

async function main() {

const tokenLockContract = await ethers.getContractAt("TokenLock", lockAddress);
const tokenContract = await ethers.getContractAt("IERC20", tokenAddress);

const [signer] = await ethers.getSigners();


let balance = await tokenContract.balanceOf(signer.address);
  console.log("Balance before withdrawal",ethers.formatEther(balance));

  console.log("Withdrawing funds...");

  const tx = await tokenLockContract.connect(signer).withdraw();
  await tx.wait();

  console.log("Funds withdrawn!");

  balance = await tokenContract.balanceOf(signer.address);
    console.log("Balance after withdrawal", ethers.formatEther(balance));
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });