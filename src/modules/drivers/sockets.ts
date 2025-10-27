import { Server } from "socket.io";
import {driverService} from "./driver.service";

export function setupSocket(io: Server) {
  io.on("connection", (socket) => {
    console.log("🔌 Motorista conectado:", socket.id);

    socket.on("updateLocation", async (data) => {
      console.log("📍 Nova localização recebida:", data);
      const { id_driver, lat, long } = data;

      const result = await driverService.updateLocation(id_driver, { lat, long });

      socket.broadcast.emit("driverLocationUpdated", result);
    });

    socket.on("disconnect", () => {
      console.log("❌ Motorista desconectado:", socket.id);
    });
  });
}
