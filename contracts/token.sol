pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {

      constructor(string memory name_, string memory symbol_, uint256 initialSupply_ ) ERC20(name_, symbol_) {

         _mint(msg.sender, initialSupply_); 
 
  }

    function mint(address to, uint256 amount) public onlyOwner {

       _mint(to, amount);
    
  }

    function burn(uint256 amount) public {

        _burn(msg.sender, amount);
    }

    mapping(address => bool) public frozenAccount;

    function freeze(address account) public onlyOwner {

        frozenAccount[account] = true;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {

        require(!frozenAccount[from], "Account is frozen");
        super._beforeTokenTransfer(from, to, amount);

    }

    function unfreeze(address account) public onlyOwner{

        frozenAccount[account] = false;
    }



}