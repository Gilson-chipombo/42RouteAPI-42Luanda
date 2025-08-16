import { FastifyInstance } from "fastify";
import { adminsController } from "./admin.controller";

export default async function adminRoutes(app: FastifyInstance) {
    app.get('/admins', adminsController.getAll);
    app.get('/admins/:id', adminsController.getById);
    app.post('/admin', adminsController.create);
    app.put('/admins/:id', adminsController.update);
    app.delete('/admins/:id', adminsController.delete);
}