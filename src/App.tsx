import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

import openSocket from 'socket.io-client';
const socket = openSocket(`http://localhost:3000`);
// const socket = openSocket(`https://lets-chat-harish.herokuapp.com`);

interface IAppProps {
  userName: string;
}

interface IAppState {
  inputValue: string;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props) {
    super(props)
    this.state = { inputValue: '' }
  }

  messagesEnd;

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.inputValue.length <= 0) {
      return
    }
    socket.emit('chat', { msg: this.state.inputValue, userName: this.props.userName });
    this.setState({
      inputValue: ''
    })
    const end = document.getElementById('scroll');
    end.scrollIntoView();
  }

  render() {
    return (
      <div className="App">
        <div className="message-container">
          <PerfectScrollbar>
            <div id="msg" ref={(el) => { this.messagesEnd = el; }} >
            </div>
            <div id="scroll" ></div>
          </PerfectScrollbar>
        </div>
        <form action="" onSubmit={this.handleSubmit}>
          <div className="text-area-container" >
            <textarea
              placeholder="Enter your message here..."
              id="m"
              required
              autoComplete="off"
              value={this.state.inputValue}
              onChange={(e) => {
                this.setState({ inputValue: e.target.value })
              }} />
          </div>
          <button className="send-button" type="submit" >Send</button>
        </form>
      </div>
    );
  }
}

export default App;
