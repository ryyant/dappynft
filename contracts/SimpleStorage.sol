// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract SimpleStorage {
  uint storedData = 7;
  mapping(address => uint) contribution;

  function set(uint amt) public payable {
    contribution[msg.sender] += amt;
  }

  function get() public view returns (uint) {
    return contribution[msg.sender];
  }
    

}
