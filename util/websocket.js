import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import Request_controller from '../controllers/request_controller';

const wss = new WebSocketServer({
  port: 8080,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024 // Size (in bytes) below which messages
    // should not be compressed if context takeover is disabled.
  }
})

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    console.log('received: %s', data);
    wss.clients.forEach(function each(client) {

        client.send(JSON.stringify({
          to: "client2",
          data: "foo"
        }));
    })
  });
})

const sendNotification = (data) => {
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(data));
  })
}

export default sendNotification;