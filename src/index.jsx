import React from 'react';
import ReactDOM from 'react-dom';

function socketSetup () {
	let ws = new WebSocket("ws:localhost:3000/ws");
	const element = (
		<div>
			<div id="chat"></div>
		</div>
	);
	ws.onmessage = (msg) => {
			getElementById("chat").innerHTML = msg.data
		}
	ReactDOM.render(element, document.getElementById('app'));
}
	



// initSocket () {
//     //ws = new WebSocket("ws://" + window.location.host + "/ws");
//     // ws.onmessage = document.getElementById("chat");
//   }

