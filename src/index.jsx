import React from 'react';
import ReactDOM from 'react-dom';

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        // messages: [],
        date: new Date()
    };
    // this.ws = new WebSocket("ws://localhost:3000/ws");
  }

  // onMessage () {
  //   var chat = document.getElementById("chat")
  //   this.ws.onmessage = (msg) => {
  //        var line =  now() + " " + msg.data + "\n";
  //           chat.innerText += line;
  //    }
  // }

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

ReactDOM.render(
  <Time />,
  document.getElementById('app')
);


// Create a new component, open the websocket in the constructor, and update its state when you get a new message
// In the state you can have an array with the messages
// In a render function, you render all the messages

