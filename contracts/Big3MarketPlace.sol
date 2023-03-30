// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Big3Marketplace is ERC721, Ownable {
    uint256 public price;
    uint256 public maxSupply;
    string private _baseTokenURI;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    constructor() ERC721("big3 NFT", "B3") {
        
    }

    function mint() public {
        _tokenId.increment();
        uint256 _newTokenId = _tokenId.current();
        _safeMint(msg.sender, _newTokenId);
    }

    function _setPrice(uint256 _price) public onlyOwner{
        price = _price;
    }

    function _getTokenId() public view returns (uint256){
        return _tokenId.current();
    }

    function _setMaxSupply(uint256 _maxSupply) public onlyOwner{
        maxSupply = _maxSupply;
    }

    function _baseURI() internal view virtual override returns(string memory) {
        return _baseTokenURI;
    }

    function _setBaseURI(string calldata _newBaseURI) public {
        _baseTokenURI = _newBaseURI;
    }

    // function withdraw(uint256 _amount) public onlyOwner{
    //     // Uncomment this line, and the import of "hardhat/console.sol", to print a log in your terminal
    //     // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);
    //     require(_amount <= address(this).balance, "insufficient balance");
    //     owner.transfer(_amount);
    // }

    function list(uint256 _nfttokenId) public {
        approve(address(this), _nfttokenId);
    }
}
