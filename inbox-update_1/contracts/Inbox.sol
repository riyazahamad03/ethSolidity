// SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.9.0;
contract Lottery{
    address public manager;
    address[] public players;

    constructor(){
        manager = msg.sender;
    }
    function enter() public payable {
        require(msg.value >= 0.00001 ether);
        players.push(msg.sender);
    }
    function random() public  view returns(uint256){
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,players)));
    }
    function pickWinner() public restricted{
        require(msg.sender == manager);
        uint index = random() % players.length;
        address payable Winner = payable(address(uint160(players[index])));
        Winner.transfer(address(this).balance);
        players = new address[](0);
    }
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    function getPlayers() public view returns(address[] memory){
        return players;
    }
}
