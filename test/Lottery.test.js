const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const { interface, bytecode } = require('../compile');

let lottery;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery Contract', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address);
    });

    it('allows one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

            
        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length);

    });

    it('allows multiple accounts to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });

        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });

        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        });

            
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length);
    });

    // Need response to throw an error with this test
        // We can handle errors with a try/catch statement
    it('requires a minimum amount of ether to enter', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            });
            assert(false); // assert if something went wrong
        }   catch (err) {
            assert(err); // assert if err true
        }
    });

    // note 1
    it('only manager can call pickWinner', async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1] // WE want test to fail - contract deployed from accounts[0]
            });
            assert(false);
        } catch (err) {
            assert(err); // if there is an error assert if true.  
        }
    })

    // note 2 - end to end test
    it('sends money to the winner and resets the players array', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });

        // return initial balance of player
            // can also be used on contract addresses.
        const initialBalance = await web3.eth.getBalance(accounts[0]); 
        await lottery.methods.pickWinner().send({ from: accounts[0] });
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const difference = finalBalance - initialBalance;

        console.log(finalBalance - initialBalance); // See gas charge
        assert(difference > web3.utils.toWei('1.8', 'ether'));


    });
});

/*
Note 1 - This funtion has a restricted modifier on it - we purposefully want this test to use the incorrect address to call this funtion and assert if there is an error. 

note 2 - There will be a slight difference between initial and final balance as we pay gas to send off transactions. 

    assert(difference > web3.utils.toWei('1.8', 'ether')); - assert if difference > than 1.8eth
*/