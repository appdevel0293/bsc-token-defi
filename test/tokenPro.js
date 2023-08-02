const { ethers } = require("hardhat");


async function main(){

    const TOKEN_ADDRESS = "0x80Dc62D283B3e09Ad159911e046e0184Fb57583f"; 

    const [owner, otherAccount] = await ethers.getSigners();

    
    const MiToken = await ethers.getContractFactory("MyToken");
    const token = await MiToken.attach(TOKEN_ADDRESS);
    console.log("Deployer - Owner Account:", owner.address); 
    console.log("Account to be frozen:", otherAccount.address);

    const amount = hre.ethers.parseEther("1000000");

   let balance = await token.balanceOf(owner.address);

    let tx = await token.connect(owner).burn(balance); 
    await tx.wait();

    
    balance = await token.balanceOf(otherAccount.address);

    tx = await token.connect(otherAccount).burn(balance); 
    await tx.wait();

     tx = await token.mint(owner.address, amount);
    await tx.wait();

   


    balance = await token.balanceOf(owner.address);
    let balance2 = await token.balanceOf(otherAccount.address);

    console.log("Balance of owner before burning", ethers.formatEther(balance));

    
    console.log("Balance of other account before transfer", ethers.formatEther(balance2));

    

}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });