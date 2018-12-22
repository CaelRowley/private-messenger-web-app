import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverEndpoint: 'http://localhost:3000',
      messageToSend: '',
      messageLog: []
    };
  };

  componentDidMount() {
    this.connectSocket();
  };

  sendMessage = () => {
    const socket = socketIOClient(this.state.serverEndpoint);
    socket.emit('emit message', this.state.messageToSend);
  };

  prepareMessage = (event) => {
    this.setState({ messageToSend: event.target.value });
  };

  connectSocket() {
    const socket = socketIOClient(this.state.serverEndpoint);
    socket.on('emit message', message => {
      let { messageLog } = this.state;
      messageLog.push(message);
      this.setState({ messageLog });
    });
  };

  render() {
    return (
      <div style={{ textAlign: 'center' }} >
        <textarea id="messageInputBox" onChange={this.prepareMessage}></textarea>
        <button id='send message' onClick={() => this.sendMessage()}>Send Message</button>
        <textarea readOnly value={this.state.messageLog}></textarea>
      </div>
    );
  };
};

export default App;
