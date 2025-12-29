//import { io } from "socket.io-client";
const io = require('socket.io-client')
const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Cadete conectado");

  socket.emit("cadete:joinRoute", {
    cadeteId: 10
  });
});

socket.on("driver:location", (data) => {
  console.log("📍 Localização recebida:", data);
});
