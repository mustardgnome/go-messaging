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
    this.ws.onmessage = this.handleMessage.bind(this);
    this.submitText = this.submitText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.userid = "";
    this.makeid = this.makeid.bind(this);
    this.chooseId = this.chooseId.bind(this);
    this.user = "";
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  //if you want a random username ...
  makeid () {
    let text = "";
    const possible = "0123456789";

        for (var i = 0; i < 4; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

    this.userid = text;
  }

  chooseId(event){
    event.preventDefault();
    var div = document.getElementById("cover");
    if(this.state.value == "" || this.state.value.length > 8) {
        this.setState({value: ""});
        return false;
    } else {
        this.user = this.state.value;
        this.setState({value: ""});
        div.style.display = 'none';
        var input = document.getElementById('chatSubmit');
        input.focus();
        input.select();
    }
  }

  componentDidMount(){
    this.makeid();
    this.nameInput.focus();  
  }

  handleMessage (msg) {
        this.state.messages.push(msg.data);
        this.setState({ messages: this.state.messages });
        const elem = document.getElementById('chatBody');
        elem.scrollTop = elem.scrollHeight;
  }

  generateTimestamp () {
    let iso = new Date().toISOString();
    return iso.split("T")[1].split(".")[0];
  }

  submitText(event) {
    event.preventDefault();
    if(this.state.value == "") {
        return false;
    }
    else {
        this.ws.send(`<${this.generateTimestamp()}> ${this.user}#${this.userid}: ${this.state.value}\n`)
        console.log(this.user);
        this.state.value = "";
    }
  }

  render() {
    return (
    <div>
      <Time />
      <div id="cover">
        <form onSubmit={this.chooseId}>
          <input id="usersubmit" type="text" value={this.state.value} onChange={this.handleChange} ref={(input) => { this.nameInput = input; }} />
        </form>
      </div>
      <div id="chatContainer">
        <div id="chatBody">{this.state.messages.map(msg => <div key={msg}>{msg}</div>)}</div>
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

