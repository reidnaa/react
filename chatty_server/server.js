
const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');

const PORT = 3001;

// Create a new express server
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');
  let userId = uuidv1();
  let countSize = wss.clients.size;
  console.log("COUNT_SIZE ",countSize);
  let counter = {
    countSize: countSize,
    type: 'count'
  };
  wss.broadcast(JSON.stringify(counter));
  const uniqueId = uuidv1();
  let messageObj = {
    id: uniqueId,
    content : 'User is connected',
    type: 'incomingNotification'
  };
  wss.broadcast(JSON.stringify(messageObj));

  ws.on('message', function incoming(message) {
    console.log("MESSAGE", message);
    let parsedMessage = JSON.parse(message);
    const uniqueId = uuidv1();

    if ( parsedMessage.type === 'postMessage'){
      let messageObj = {
        id: uniqueId,
        username : parsedMessage.username,
        content : parsedMessage.content,
        type: 'incomingMessage'

      };
      wss.broadcast(JSON.stringify(messageObj));
    } else if (parsedMessage.type === 'postNotification'){
      let messageObj = {
        id: uniqueId,
        username : parsedMessage.username,
        content : parsedMessage.content,
        type: 'incomingNotification'

      };
      wss.broadcast(JSON.stringify(messageObj));
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    counter = {
      countSize: wss.clients.size,
      type: 'count'
    };

    wss.broadcast(JSON.stringify(counter));
    let messageObj = {
      id: uuidv1(),
      content : 'User is disconnected',
      type: 'incomingNotification'
    };
    wss.broadcast(JSON.stringify(messageObj));
  });
});