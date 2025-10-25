import { FastifyInstance } from "fastify";
import { adminsController } from "./admin.controller";
import { autoDocs } from '../../utils/docs';
const docs = autoDocs('Admins', 'Administrators');

export default async function adminRoutes(app: FastifyInstance) {
    app.get('/admins',{ schema: docs.list },  adminsController.getAll);
    app.get('/admins/:id', { schema: docs.get }, adminsController.getById);
    app.post('/admin', { schema: docs.create }, adminsController.create);
    app.put('/admins/:id', { schema: docs.update }, adminsController.update);
    app.delete('/admins/:id',{ schema: docs.delete },  adminsController.delete);
}
