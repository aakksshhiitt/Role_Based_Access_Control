const hardhat=require("hardhat");

async function main(){

    const [admin]=await ethers.getSigners();
    console.log("deployer is "  + await admin.getAddress());
    const contract= await ethers.getContractFactory("RBACManager");
    const deployedContract= await contract.deploy();
    console.log("Contract address is " + await deployedContract.getAddress());
    await deployedContract.waitForDeployment();

    
}

main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exitCode(1);
})