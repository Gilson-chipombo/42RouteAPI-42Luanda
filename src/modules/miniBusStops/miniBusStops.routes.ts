import { FastifyInstance } from "fastify";
import { miniBusStopsController } from "./miniBusStops.controller";
import { autoDocs } from '../../utils/docs';
const docs = autoDocs('MiniBusStop', 'Paragens');

export default async function minibusstopsRoutes(app: FastifyInstance) {
    app.get('/minibusstops', { schema: docs.list }, miniBusStopsController.getAll);
    app.get('/minibusstop/:id', { schema: docs.get }, miniBusStopsController.getById);
    app.post('/minibusstop', {schema: docs.create }, miniBusStopsController.create);
    app.put('/minibusstop/:id', {schema: docs.update }, miniBusStopsController.update);
    app.delete('/minibusstop/:id',  {schema: docs.delete }, miniBusStopsController.delete);
}
