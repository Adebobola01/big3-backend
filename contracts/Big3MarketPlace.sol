// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Big3Marketplace is ERC721FULL, Ownable {
    uint256 public price;
    uint256 public maxSupply;
    string private _baseTokenURI;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    constructor() ERC721("big3 NFT", "B3") {
        
    }

    function mint() public {
        uint256 _newTokenId = _tokenId.increment();
        _safeMint(msg.sender, _newTokenId);
    }

    function _setPrice(uint256 _price) public onlyOwner{
        price = _price ether;
    }

    function _getTokenId() public view returns (uint256){
        return _tokenId;
    }

    function _setMaxSupply(uint256 _maxSupply) public onlyOwner{
        maxSupply = _maxSupply;
    }

    function _baseURI(uint256 _tokenId, string _tokenURI) public {
        _setTokenURI(_tokenId, _tokenURI);
    }

    function _ baseURI() internal view virtual overrride returns(string memory) {
        return _baseTokenURI;
    }

    function _setBaseURI(string calldata _newBaseURI) public {
        _baseTokenURI = _newBaseURI;
    }

    function withdraw(_amount) public onlyOwner{
        // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
        require(_amount <= address(this).balance, "insufficient balance");

        owner.transfer(address(this).balance);
    }
}
