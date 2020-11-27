// V54 - Wallet Provider Setup
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const keys = require('./config/keys');

// HDWallet helps to generate public key, Pvt key and address of OUR account
const provider = new HDWalletProvider(
    keys.metaMaskMnemonic,
    keys.InfuraLinkRinkeby
);
const web3 = new Web3(provider);

// Create function as async/await cannot be used outside of a function
const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi There!'] })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
};
deploy();