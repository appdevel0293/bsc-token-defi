pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract TokenLock { 

    IERC20 public token;

    uint256 INTEREST_RATE = 5;
    uint256 SECONDS_IN_YEAR = 31536000;

      struct LockInfo {
      uint256 amount;
      uint256 unlockTime;
      uint256 lockTime;
     }

     mapping(address => LockInfo[]) public lockInfomap;

     
    constructor(address _token) {
         token = IERC20(_token); 
    }

    function lock (uint256 _amount, uint256 _unlockTime) public {

        uint256 balance = token.balanceOf(msg.sender);

        require(_amount <= balance, "Insufficient balance");

        
         lockInfomap[msg.sender].push(
            LockInfo(_amount, _unlockTime, block.timestamp)
            );

         token.transferFrom(msg.sender, address(this), _amount);   
    }

    function withdraw () public {

          LockInfo[] storage userLockInfo = lockInfomap[msg.sender];

            for(uint i = 0; i < userLockInfo.length; i++) {
                 LockInfo storage info = userLockInfo[i];

                    if(block.timestamp >= info.unlockTime) {

                       uint timeLocked = block.timestamp - info.lockTime;

                       uint256 interestPerSecond = (info.amount * INTEREST_RATE) / (100 * SECONDS_IN_YEAR);

                       uint256 interest = interestPerSecond * timeLocked;

                       token.transfer(msg.sender, (info.amount + interest) );

                       info.amount = 0;


      
                  }
    
            }


    }





}