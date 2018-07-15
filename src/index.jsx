import React from 'react';
import ReactDOM from 'react-dom';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.ws = new WebSocket("ws:localhost:3000/ws");;
    this.initSocket = this.initSocket.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }



 }

function Time () {
	let ws = new WebSocket("ws:localhost:3000/ws");
	const element = (
		<div>
    	  <h2>It is {new Date().toLocaleTimeString()}.</h2>
    	  <div id="chat"></div>
    	</div>
	);
	ws.onmessage = (msg) => {
			getElementById("chat").innerHTML = msg.data
		}
	ReactDOM.render(element, document.getElementById('app'));
}
	
setInterval(Time, 1000);


// Create a new component, open the websocket in the constructor, and update its state when you get a new message
// In the state you can have an array with the messages
// In a render function, you render all the messages

