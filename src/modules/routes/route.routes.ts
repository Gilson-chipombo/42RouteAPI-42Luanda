import { FastifyInstance } from "fastify";
import routeController from "./route.controller";

async function routeRoutes(app: FastifyInstance) {
  app.post("/routes", routeController.createRoute);
  app.post("/routes/:id/stops", routeController.addStops);
  app.get("/routes", routeController.list);
}

export default routeRoutes;
