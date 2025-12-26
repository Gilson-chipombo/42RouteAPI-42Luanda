import { FastifyRequest, FastifyReply } from "fastify";
import { routeService } from "./route.service";
import { Routes, RouteStops } from "./route.interface";

class RouteController {
  async createRoute(req: FastifyRequest<{ Body: Routes }>, reply: FastifyReply) {
    const route = await routeService.createRoute(req.body);
    reply.send(route);
  }

  async addStops(req: FastifyRequest<{ Params: { id: number }, Body: RouteStops }>, reply: FastifyReply) {
    const updatedRoute = await routeService.addStopsToRoute(req.params.id, req.body);
    reply.send(updatedRoute);
  }

  async list(req: FastifyRequest, reply: FastifyReply) {
    const routes = await routeService.listRoutes();
    reply.send(routes);
  }
}

export default new RouteController();
