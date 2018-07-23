import React from 'react';
import ReactDOM from 'react-dom';

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        date: new Date()
    };
    
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    ); 
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h2>{this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        messages: []
    };
    this.ws;
    this.initSocket = this.initSocket.bind(this);
  }

  initSocket () {
    this.ws = new WebSocket("ws://localhost:3000/ws");
    this.ws.onmessage = (msg) => {
        this.state.messages.push(msg.data);
        this.setState({ messages: this.state.messages });
    }
  }

  render() {
    return (
    <div>
      <Time />
      <h1>{this.state.messages}</h1>
    </div>
    );
  }
}


ReactDOM.render(
  <Chat />,
  document.getElementById('app')
);


// Create a new component, open the websocket in the constructor, and update its state when you get a new message
// In the state you can have an array with the messages
// In a render function, you render all the messages

