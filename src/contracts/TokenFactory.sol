
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MemeToken is ERC20, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address owner
    ) ERC20(name, symbol) Ownable(owner) {
        _mint(owner, totalSupply * 10**decimals());
    }
}

contract TokenFactory is Ownable {
    event TokenCreated(address tokenAddress, string name, string symbol, uint256 totalSupply);
    
    uint256 public creationFee = 0.01 ether;
    mapping(address => address[]) public creatorTokens;
    
    constructor(address initialOwner) Ownable(initialOwner) {}
    
    function createToken(
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) external payable returns (address) {
        require(msg.value >= creationFee, "Insufficient creation fee");
        
        MemeToken newToken = new MemeToken(
            name,
            symbol,
            totalSupply,
            msg.sender
        );
        
        creatorTokens[msg.sender].push(address(newToken));
        
        emit TokenCreated(address(newToken), name, symbol, totalSupply);
        
        return address(newToken);
    }
    
    function setCreationFee(uint256 newFee) external onlyOwner {
        creationFee = newFee;
    }
    
    function withdrawFees() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    function getCreatorTokens(address creator) external view returns (address[] memory) {
        return creatorTokens[creator];
    }
}
