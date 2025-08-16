import { FastifyInstance } from "fastify";
import { miniBusStopsController } from "./miniBusStops.controller";

export default async function minibusstopsRoutes(app: FastifyInstance) {
    app.get('/minibusstops', miniBusStopsController.getAll);
    app.get('/minibusstop/:id', miniBusStopsController.getById);
    app.post('/minibusstop', miniBusStopsController.create);
    app.put('/minibusstop/:id', miniBusStopsController.update);
    app.delete('/minibusstop/:id', miniBusStopsController.delete);
}