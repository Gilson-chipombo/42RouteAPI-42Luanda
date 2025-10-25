import { FastifyInstance } from "fastify";
import { driversController } from "./driver.controller";
import { autoDocs } from '../../utils/docs';
const docs = autoDocs('Drivers', 'Motoristas');


export default async function driverRoutes(app: FastifyInstance) {
    app.get('/drivers',    { schema: docs.list },  driversController.getAll);
    app.get('/driver/:id', { schema: docs.get }, driversController.getById);
    app.post('/driver',    { schema: docs.create }, driversController.create);
    app.put('/driver/:id', { schema: docs.update }, driversController.update);
    app.delete('/driver/:id', { schema: docs.delete }, driversController.delete);
}

/*
export default async function driverRoutes(app: FastifyInstance) {
    app.get('/drivers', driversController.getAll);
    app.get('/driver/:id', driversController.getById);
    app.post('/driver', driversController.create);
    app.put('/driver/:id', driversController.update);
    app.delete('/driver/:id', driversController.delete);
}*/