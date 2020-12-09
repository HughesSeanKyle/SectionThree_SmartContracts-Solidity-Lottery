import React from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends React.Component {
  // Initialize state to default value
  constructor(props) {
    super(props);

    this.state = { manager: ''};
  };


  async componentDidMount() { //1
    const manager = await lottery.methods.manager().call(); //2 

    this.setState({ manager }) //3 
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
      </div>
    );
  };
}

export default App;

/*
//1 - Will Automatically be called when component is rendered to the screen. 
//2 - When metamask provider used - we do not have to specify the from field in the call() method - This copy of web3 has a default account already set. "first account we are signed into on metamask"

  Note that in a class based method such as componentDidMount you can use an async function on it - But with the Hook equivalent (useEffect) you have to define a helper function to use async.
  
//3 - Key/Value name the same {manager:manager}. - Can name key whatever you want. 
*/
