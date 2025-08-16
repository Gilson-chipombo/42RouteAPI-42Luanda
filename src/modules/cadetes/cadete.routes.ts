import { FastifyInstance } from "fastify";
import { cadetesController } from "./cadete.controller";

export default async function cadeteRoutes(app: FastifyInstance) {
    app.get('/cadetes', cadetesController.getAll);
    app.get('/cadetes/:id', cadetesController.getById);
    app.post('/cadete', cadetesController.create);
    app.put('/cadetes/:id', cadetesController.update);
    app.delete('/cadetes/:id', cadetesController.delete);
}