import React from 'react';
import ReactDOM from 'react-dom';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { messages: [] };
    this.ws;
  }

Time () {
	const element = (
		<div>
    	  <h2>It is {new Date().toLocaleTimeString()}.</h2>
    	  <div id="chat"></div>
    	</div>
	);
	ReactDOM.render(element, document.getElementById('app'));
}

onMessage () {
	this.ws = new WebSocket("ws://localhost:3000/ws");
	var chat = document.getElementById("chat")
	this.ws.onmessage = (msg) => {
		var line =  now() + " " + msg.data + "\n";
        chat.innerText += line;
	}
}

}
	
setInterval(Time, 1000);


// Create a new component, open the websocket in the constructor, and update its state when you get a new message
// In the state you can have an array with the messages
// In a render function, you render all the messages

