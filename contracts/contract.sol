// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Splitit {
    mapping(string => address) private nameToAddress;
    mapping(address => string) private addressToName;

    function createUser(string memory _name) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(nameToAddress[_name] == address(0), "User already exists");
        require(bytes(addressToName[msg.sender]).length == 0, "Address already registered");

        nameToAddress[_name] = msg.sender;
        addressToName[msg.sender] = _name;
    }

    function getName() public view returns (string memory) {
        require(bytes(addressToName[msg.sender]).length > 0, "User not registered");
        return addressToName[msg.sender];
    }

    function getAddress(string memory _name) public view returns (address) {
        return nameToAddress[_name];
    }

    function transferAll(string[] memory _addrs , uint[] memory _amount ) public payable {
        require(_addrs.length == _amount.length , "Invalid amounts, length does not match array lengths.");
        require(_addrs.length > 0 , "No addresses Provided");

        uint totalAmount = 0;
        for (uint i = 0; i < _amount.length; i++) {
            totalAmount += _amount[i];
        }

        require(msg.value >= totalAmount, "Insufficient ETH sent");

        for (uint i = 0; i < _addrs.length; i++) {
            (bool success, ) = payable(nameToAddress[_addrs[i]]).call{value: _amount[i]}("");
            require(success, "Transfer failed");
        }
    }


    function transfer(string memory _to, uint256 _amount) public payable {
        (bool success , ) = payable(nameToAddress[_to]).call{value : _amount}("");
        require(success,"Transfer failed");
    }
}
