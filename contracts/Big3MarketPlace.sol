// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Big3Marketplace is ERC721FULL, Ownable {
    uint256 public price;
    uint256 public maxSupply;


    constructor() ERC721("big3 NFT", "B3") {
        
    }

    function mint() public {
        _safeMint(msg.sender, tokenId);
    }

    function _setPrice(uint256 _price) public onlyOwner{
        price = _price ether;
    }

    function _setSupply(uint256 _maxSupply) public onlyOwner{
        maxSupply = _maxSupply;
    }

    function _setNFTURI(uint256 _tokenId, string _tokenURI) public {
        _setTokenURI(_tokenId, _tokenURI);
    }


    function withdraw(_amount) public onlyOwner{
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
        require(_amount <= address(this).balance, "insufficient balance");

        owner.transfer(address(this).balance);
    }
}
