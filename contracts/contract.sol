// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ContractERC20 is ERC20, Ownable {
    uint256 private _initialSupply;

    address payable _ContractAddress;

    // payable(0x03c0b54670f1eaD25Ec61554Daf2DE82B6139121);

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 initialSupply_,
        address payable contractAddress
    ) ERC20(name_, symbol_) {
        _initialSupply = initialSupply_;
        _mint(msg.sender, initialSupply_ * 10 ** decimals());
        _ContractAddress = contractAddress;
    }

    function initialSupply() public view returns (uint256) {
        return _initialSupply;
    }

    function sendBalance_founders(uint256 amount) public onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance.");
        payable(_ContractAddress).transfer(amount);
    }

    // Fallback function to receive Ether
    receive() external payable {}
}
