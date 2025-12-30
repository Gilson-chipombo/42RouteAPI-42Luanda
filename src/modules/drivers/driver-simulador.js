import { io } from "socket.io-client";

const DRIVER_ID = 3; // coloque um id_driver que exista no banco

// Conecta ao WebSocket do servidor Fastify
const socket = io("https://four2routeapi.onrender.com", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("🚐 Motorista conectado ao WebSocket:", socket.id);

  simulateLocation();
});

socket.on("disconnect", () => {
  console.log("Motorista desconectado");
});

// Função que envia localização aleatória dentro de Luanda 
function simulateLocation() {
  setInterval(() => {
    const lat = -8.83 + Math.random() * 0.02;
    const long = 13.23 + Math.random() * 0.02;

    const payload = {
      id_driver: DRIVER_ID,
      lat,
      long,
    };

    console.log("📡 Enviando localização:", payload);

    socket.emit("update_location", payload);
  }, 3000); // envia a cada 3 segundos
}
//npm install socket.io-client
//node driver-simulator.js
