pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";

contract wallet{
    using SafeMath for uint256;

struct Token {
    bytes32 ticker;
    address tokenAddress;
}

bytes32[] public tokenList;
mapping(bytes32 => Token) public tokenMapping;

mapping(address => mapping(bytes32 => uint256)) public balances;

function addToken (bytes32 ticker, address tokenAddress) external {
    tokenMapping[ticker] = Token(ticker, tokenAddress);
    tokenList.push(ticker);    
}

function deposit(uint amount, bytes32 ticker) external {
    require (tokenMapping[ticker].tokenAddress != address(0),"the token is not supported");
    IERC20(tokenMapping[ticker].tokenAddress).transferFrom(msg.sender, address(this), amount);
    balances[msg.sender][ticker] = balances[msg.sender][ticker].add(amount);  
}

function withdrawl(uint amount, bytes32 ticker) external {
    require (tokenMapping[ticker].tokenAddress != address(0),"the token is not supported");
    require (balances[msg.sender][ticker] >=amount, "Balance not sufficient");
    IERC20(tokenMapping[ticker].tokenAddress).transfer(msg.sender, amount);
    balances[msg.sender][ticker] = balances[msg.sender][ticker].sub(amount);
}

}