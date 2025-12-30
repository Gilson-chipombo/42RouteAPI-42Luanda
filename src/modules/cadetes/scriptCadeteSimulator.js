//import { io } from "socket.io-client";
const io = require('socket.io-client')
//const socket = io("http://localhost:3000");
const socket = io("https://four2routeapi.onrender.com",{
    transport: ["websocket"],
});

socket.on("connect", () => {
  console.log("Cadete conectado");

  socket.emit("cadete:joinRoute", {
    cadeteId: 19
  });
});

socket.on("driver:location", (data) => {
  console.log("Localização recebida:", data);
});

