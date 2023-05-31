require("dotenv").config();
const { ethers } = require("hardhat");
const hre = require("hardhat");
require("@nomiclabs/hardhat-etherscan");

const red = "\x1b[31m";
const green = "\x1b[32m";
const reset = "\x1b[0m";

const TOKEN = {};
TOKEN["fileName"] = "contract.sol";
TOKEN["name"] = "ContractERC20";
TOKEN["displayName"] = "TURTLETOKEN";
TOKEN["symbol"] = "TURTLE";
TOKEN["amount"] = "1000000000000000000000000";
TOKEN["NETWORK"] = hre.network.name;

async function deploy_func() {
 const [deployer] = await ethers.getSigners();

 console.log(
  `${red}Deployer Address:${green} ${deployer.address}${reset}\n` +
   `${red}Account Balance:${green} ${(
    await deployer.getBalance()
   ).toString()}${reset}\n` +
   `${red}Network:${green} ${TOKEN["NETWORK"]}${reset}`
 );

 const contractFactory = await ethers.getContractFactory(
  TOKEN["name"],
  TOKEN["symbol"],
  TOKEN["amount"],
  deployer
 );
 const contractDeployed = await contractFactory.deploy(
  TOKEN["displayName"],
  TOKEN["symbol"],
  TOKEN["amount"]
 );

 await contractDeployed.deployed();
 console.log(
  `${red}Contract Address:${green} ${contractDeployed.address}${reset}`
 );
 TOKEN["address"] = contractDeployed.address;
}

async function verifyContract() {
 console.log(
  `${red}Verification Status:${green} Starting contract verification${reset}`
 );
 let validate_blob = {
  address: TOKEN["address"],
  contract: `contracts/${TOKEN["fileName"]}:${TOKEN["name"]}`,
  constructorArguments: [
   TOKEN["displayName"],
   TOKEN["symbol"],
   TOKEN["amount"],
  ],
  network: TOKEN["NETWORK"],
 };

 try {
  let verificationResult = await hre.run("verify:verify", validate_blob);
  console.log(
   `${red}Verification Result:${green} ${verificationResult}${reset}`
  );
 } catch (error) {
  console.error(`${red}Hardhat Verification Error:${green} ${error}${reset}`);

  console.log(
   `\n\n${red}Manual Verification Command:${green} \n` +
    `npx hardhat verify --contract ${validate_blob.contract} ${
     validate_blob.address
    } ${validate_blob.constructorArguments.join(" ")} --network ${
     validate_blob.network
    } --show-stack-traces${reset}`
  );
 }
}

async function main() {
 await deploy_func();
 await verifyContract();
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(`${red}Error:${green} ${error}${reset}`);
  process.exit(1);
 });
