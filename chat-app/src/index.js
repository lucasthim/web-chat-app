// import socketIOClient from 'socket.io-client';

// const server_port = 8001;
// const server_url = `http://localhost:${server_port}/`;

// const socket = socketIOClient(server_url);

// socket.on('connect', function () {
//   socket.send('Hi there!');

//   socket.on('message', function (msg) {
//     // My message
//   })
// });

import React from 'react';
import { render } from 'react-dom';

import Chat from "./components/Chat"

render(<Chat/>, document.getElementById('app'));