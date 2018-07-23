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
        messages: [],
        value : ''
    };
    this.ws = new WebSocket("ws://localhost:3000/ws");
    this.handleMessage = this.handleMessage.bind(this);
    this.submitText = this.submitText.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleMessage () {
    this.ws.onmessage = (msg) => {
        this.state.messages.push(msg.data);
        this.setState({ messages: this.state.messages });
    }
    this.state.messages.map(msg => <div key={msg}>{msg}</div>)
  }

  submitText(event) {
    event.preventDefault();
    this.ws.send(this.state.value)
    this.handleMessage();
    console.log(this.state.value);
  }

  render() {
    return (
    <div>
      <Time />
      <h1>{this.state.messages}</h1>
      <form onSubmit={this.submitText}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
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

