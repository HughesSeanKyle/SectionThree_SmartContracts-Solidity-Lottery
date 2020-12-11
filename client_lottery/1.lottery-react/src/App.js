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
    balance: '',
    value: '',
    message: ''
  }; // 5


  // Do Once when component renders 
  async componentDidMount() { //1
    const manager = await lottery.methods.manager().call(); //2
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address); // 4

    this.setState({ manager, players, balance }) //3 
  };

  // 6
  onSubmit = async (event) => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Processing your transaction, please wait...' })

    // This line will take about 15/30s to process. 
    await lottery.methods.enter().send({
      from: accounts[0], // assumption that user will enter from 1st metamask account
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'Your entry was successful. Goodluck!' })

  };

  // Called anytime someone clicks on pick winner button
  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' })

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!' })
  };


  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}. 
          There are currently {this.state.players.length} people entered, competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
            <div>
              <label>Amount of ether to enter</label>
              <input 
                value={this.state.value}
                onChange={event => this.setState({ value: event.target.value })}
              />
            </div>
            <button>Enter</button>
        </form> 

        <hr />

        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>

        <hr />

        <h1>{this.state.message}</h1>

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
    
//5 - The value state will be initialized as an empty string for a different reason that the balance state because a text input will always be empty string inputs or will be a string that we are working with.

//6 - When writing onSubmit this way we do not have to worry about the context of 'this'. The value of this will be automatically set to be equal to our component.
*/
