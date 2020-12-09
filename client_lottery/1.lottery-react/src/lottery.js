import web3 from './web3';

// Information needed to create local copy of contract in browser
    // Making a 'local' instance of contract

const address = '0xcC8C3261cB0387a56fc564B24FBfFEd5C0FBC102';

const abi = [
    {"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},
    {"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},
    {"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},
    {"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},
    {"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}
];

export default new web3.eth.Contract(abi, address);

/*
REMINDER
    Web3 is our portal between the solidity (eth blockchain) and JS world (client browser, frontend).
    
    The same code that we used to test contract can now be used in the react side as the abi now gives up all the methods to do so. 
*/

