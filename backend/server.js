//wss.on(connection) --> server connection
//wss.on(message)--> message could be connection, message and disconnection
//wss.on(close)--> disconnect

const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let users = {};

function handleEvent(message, senderName) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });

  
  console.log(`Event message sent: ${JSON.stringify(message)}`);
  const recipientNames = Object.keys(users)
   .filter(name => name!== senderName && users[name].readyState === WebSocket.OPEN);
  console.log(`Event message broadcast to users: ${recipientNames.join(', ')}`);
}

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.type) {
      case 'CONNECT':
        users[data.name] = ws;
        console.log(`User connected: ${data.name}`);
        handleEvent({ type: 'USER_CONNECTED', name: data.name }, data.name);
        break;
      case 'MESSAGE':
        if (users[data.to]) {
          console.log(`Message from ${data.from} to ${data.to}: ${data.text}`);
          users[data.to].send(JSON.stringify({ type: 'MESSAGE', from: data.from, text: data.text }));
        } else {
          console.log(`User not found: ${data.to}`);
          ws.send(JSON.stringify({ type: 'USER_NOT_FOUND', name: data.to }));
        }
        break;
      case 'DISCONNECT':
        console.log(`User disconnected: ${data.name}`);
        delete users[data.name];
        handleEvent({ type: 'USER_DISCONNECTED', name: data.name }, data.name);
        break;
      default:
        console.log('Unknown message type:', data.type);
    }
  });

  ws.on('close', () => {
    for (let name in users) {
      if (users[name] === ws) {
        console.log(`Connection closed for user: ${name}`);
        delete users[name];
        handleEvent({ type: 'USER_DISCONNECTED', name }, name);
        break;
      }
    }
  });
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});
