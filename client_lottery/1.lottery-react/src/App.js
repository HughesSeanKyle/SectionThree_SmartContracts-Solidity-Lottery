import React from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
  // Initialize state to default value
  state = {
    manager: '', 
    players: [],
    balance: ''
  };

  // Do Once when component renders 
  async componentDidMount() { //1
    const manager = await lottery.methods.manager().call(); //2
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address); // 4

    this.setState({ manager, players, balance }) //3 
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}. 
          There are currently {this.state.players.length} people entered, cpmpeting to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
      </div>
    );
  };
}

export default App;

/*
//1 - Will Automatically be called when component is rendered to the screen. 
//2 - When metamask provider used - we do not have to specify the from field in the call() method - This copy of web3 has a default account already set. "first account we are signed into on metamask"

  Note that in a class based method such as componentDidMount you can use an async function on it - But with the Hook equivalent (useEffect) you have to define a helper function to use async.
  
//3 - Key/Value name the same {manager:manager}. One is the variable defined in componentDidMount and the other is the name of the state. If both names are the same you can just use one declaration for both - Can name key whatever you want. 

//4 - lottery.options.address => retieves the address of the contract. 

    The balance variable is not actually a number but it is an object. Number that is  wrapped in a library called bigNumber.js. For this reason we are initializing balance as an empty string in the mean time. 
*/
