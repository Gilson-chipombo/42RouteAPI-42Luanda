import { buildApp } from './app'
import { createServer } from "http";
import { Server } from "socket.io";
import { setupSocket } from "./modules/drivers/sockets";

async function start() {
  const HOST = '0.0.0.0'
  const app = await buildApp()

  const server = createServer(app.server);

  const io = new Server(server, {
    cors: { origin: "*" },
  });

  setupSocket(io);
  try{
    await app.listen({ port: 3000, host: HOST }).then(() =>{
      console.log(`Server is running on http://${HOST}:3000`)
   })
  }catch(err)
  {
    //app.log.error(err);
    process.exit(1);
  }
}

start()

//npx ts-node src/main.ts