import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

// function App() {
//   return <div>Hello, TrybeWallet!</div>;
// }
class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/carteira" component={ Wallet } />
        </Switch>
      </main>
    );
  }
}

export default App;
