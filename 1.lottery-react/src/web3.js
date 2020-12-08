import Web3 from 'web3'; // constructor func - Capital 'W'

// Must be added to connect meta mask with browser
window.ethereum.enable()

const web3 = new Web3(window.web3.currentProvider);



export default web3;