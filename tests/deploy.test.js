const { ethers } = require("hardhat");
const { expect } = require("chai");
// const { describe } = require("mocha");

describe("ContractERC20", () => {
  beforeEach(async () => {
    [owner, signer2, signer3] = await ethers.getSigners();
    ContractERC20Factory = await ethers.getContractFactory("ContractERC20");
    ContractERC20 = await ContractERC20Factory.deploy(
      "turtlecoin",
      "turtle",
      (initialSupply = ethers.utils.parseEther("1000000")),
      signer3.address
    );
  });

  describe("Main Functions", () => {
    it("Deployment should assign the total supply of tokens to the owner", async () => {
      ownerBalance = await ContractERC20.balanceOf(owner.address);
      expect(await ContractERC20.totalSupply()).to.equal(ownerBalance);
      console.log(`___________________________________________________`);
    });

    it("Should mint correct initial supply", async () => {
      expect(await ContractERC20.initialSupply()).to.equal(initialSupply);
      console.log(`____________________________________________________`);
    });

    it("Address_1: Should not allow non-owners to call sendBalance_founders", async function () {
      await expect(
        ContractERC20.connect(signer2).sendBalance_founders(1000)
      ).to.be.revertedWith("Ownable: caller is not the owner");
      console.log(`____________________________________________________`);
    });

    it("Address_2: Should not allow non-owners to call sendBalance_founders", async function () {
      await expect(
        ContractERC20.connect(signer3).sendBalance_founders(1000)
      ).to.be.revertedWith("Ownable: caller is not the owner");
      console.log(`____________________________________________________`);
    });

    it("Should not allow to send more balance than the contract has", async function () {
      await expect(
        ContractERC20.connect(owner).sendBalance_founders(10000)
      ).to.be.revertedWith("Insufficient balance.");
      console.log(`____________________________________________________`);
    });

    it("Should transfer the correct amount to the specified address", async function () {
      await ContractERC20.transfer(signer3.address, 100);
      expect(await ContractERC20.balanceOf(signer3.address)).to.equal(100);
      console.log(`____________________________________________________`);
    });

    it(" Should receive Ether correctly", async function () {
      const tx = await owner.sendTransaction({
        to: ContractERC20.address,
        value: ethers.utils.parseEther("1"),
      });
      await tx.wait(); // Wait for the transaction to be mined
      expect(await ethers.provider.getBalance(ContractERC20.address)).to.equal(
        ethers.utils.parseEther("1")
      );
      console.log(`____________________________________________________`);
    });
  });
});
