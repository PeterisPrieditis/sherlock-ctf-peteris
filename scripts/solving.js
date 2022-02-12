//npx hardhat compile
//node scripts/solving.js

const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
    const SETUP = await ethers.getContractFactory("Setup");
    const EXPLOIT = await ethers.getContractFactory("Exploit");

    const setup = await SETUP.deploy();
    const ctf = await ethers.getContractAt(
        "StableSwap2",
        await setup.instance()
    );

    console.log("Before exploit - solved:", await setup.isSolved());

    await EXPLOIT.deploy(ctf.address);

    console.log("After exploit  - solved:", await setup.isSolved());

    //console.log("test:", await setup.test());
    //console.log("test2:", await setup.test2());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });