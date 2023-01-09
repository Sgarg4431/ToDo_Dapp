// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers } = require("hardhat");
async function main() {
  const ToDo=await ethers.getContractFactory("ToDO");
  const todo=await ToDo.deploy();
  console.log(todo.address);
}
//0x165a05337e03189E2bcA1413543E8155a822706b
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
