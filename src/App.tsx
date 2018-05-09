import * as React from 'react';
import './App.css';
import logo from './logo.svg';

import openSocket from 'socket.io-client';
const port = process.env.PORT || 8080;
const socket = openSocket(`https://lets-chat-harish.herokuapp.com`);


interface IAppState {
  inputValue: string;
}

class App extends React.Component<{}, IAppState> {
  constructor(props) {
    super(props)
    this.state = { inputValue: '' }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('>> socket', socket);
    console.log('>> this.state.inputValue', this.state.inputValue);
    socket.emit('chat', this.state.inputValue);
  }

  render() {
    return (
      <div className="App">
        <ul id="msg">
        </ul>
        <form action="" onSubmit={this.handleSubmit} >
          <input id="m" autoComplete="off" onChange={(e) => {
            this.setState({ inputValue: e.target.value })
          }} />
          <button type="submit" >Send</button>
        </form>
      </div>
    );
  }
}

export default App;
