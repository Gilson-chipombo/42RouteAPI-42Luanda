import { FastifyInstance } from "fastify";
import { driversController } from "./driver.controller";

export default async function driverRoutes(app: FastifyInstance) {
    app.get('/drivers', driversController.getAll);
    app.get('/driver/:id', driversController.getById);
    app.post('/driver', driversController.create);
    app.put('/driver/:id', driversController.update);
    app.delete('/driver/:id', driversController.delete);
}