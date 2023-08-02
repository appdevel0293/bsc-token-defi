const { ethers } = require("hardhat");

const tokenAddress = "0x46EDBa82BB3F65d0f5Ec448076836B917c1b0539";
const lockAddress = "0x295c77358BB4518Ff9d45C644C567B7fd4D42bdD";;

async function main() {

  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const unlockTime = currentTimestampInSeconds + 60;

  const tokenLockContract = await ethers.getContractAt("TokenLock", lockAddress);

  const tokenContract = await ethers.getContractAt("IERC20", tokenAddress);

  const [signer] = await ethers.getSigners();

  let balance = await tokenContract.balanceOf(signer.address);
  console.log("Balance before lock", ethers.formatEther(balance));

  const amount = ethers.parseEther("1000"); 

  let tx = await tokenContract.connect(signer).approve(lockAddress, amount);
  await tx.wait();
  
  tx = await tokenLockContract.connect(signer).lock(amount, unlockTime);
  await tx.wait();

  console.log("Tokens locked!");

  balance = await tokenContract.balanceOf(signer.address);
  console.log("Balance after lock", ethers.formatEther(balance));
}


main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });