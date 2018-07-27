import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
    this.makeid = this.makeid.bind(this);
    this.user = "";
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  makeid () {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

    this.user = text;
  }

  componentDidMount(){
    this.makeid();
  }

  handleMessage () {
    this.ws.onmessage = (msg) => {
        this.state.messages.push(msg.data);
        this.setState({ messages: this.state.messages });
        var elem = document.getElementById('chatBody');
        elem.scrollTop = elem.scrollHeight;
    }
    this.state.messages.map(msg => <div key={msg}>{msg}</div>)
  }

  generateTimestamp () {
    var iso = new Date().toISOString();
    return iso.split("T")[1].split(".")[0];
  }

  submitText(event) {
    event.preventDefault();
    if(this.state.value == "")
        return false;
    else
        this.ws.send("<" + this.generateTimestamp() + ">" + " " + this.user +": " + this.state.value + "\n")
        console.log(this.user);
        this.state.value = "";
  }

  render() {
    return (
    <div>
      {this.handleMessage()}
      <Time />
      
      <div id="chatContainer">
        <div id="chatBody">{this.state.messages}</div>
      </div>
      
      <form onSubmit={this.submitText}>
        <input id="chatSubmit" type="text" value={this.state.value} onChange={this.handleChange} />
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

