// const express = require("express");
// const socket = require("socket.io");

// // App setup
// const PORT = 5000;
// const app = express();
// const server = app.listen(PORT, function () {
//   console.log(`Listening on port ${PORT}`);
//   console.log(`http://localhost:${PORT}`);
// });

// // Static files
// app.use(express.static("public"));

// // Socket setup
// const io = socket(server);

// io.on("connection", function (socket) {
//   console.log("Made socket connection");
// });

import app from "express"
import { Server } from "socket.io";
import http from "http"

const server = http.createServer(app)
const io = new Server(server)




//Whenever someone connects this gets executed
io.on('connection', function(socket) {
   console.log('A user connected');

   //Whenever someone disconnects this piece of code executed
   socket.on('disconnect', function () {
      console.log('A user disconnected');
   });

   socket.emit("welcome", "Hello and Welcome to the Server");
});


server.listen(5000,()=>{
    console.log(`Listen  server on port http://localhost:5000`)
})

