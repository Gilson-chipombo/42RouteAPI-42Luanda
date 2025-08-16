import { FastifyReply, FastifyRequest } from "fastify";
import { miniBusStopService } from "./miniBusStops.service";

export const miniBusStopsController = {
    async getAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const stops = await miniBusStopService.findAll();
            return reply.send(stops);
        } catch (error) {
            return reply.status(500).send({ error: 'Failed to fetch bus stops' });
        }
    },

    async getById(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            const stop = await miniBusStopService.findById(id);
            if (!stop) {
                return reply.status(404).send({ error: 'Bus stop not found' });
            }
            return reply.send(stop);
        } catch (error) {
            return reply.status(500).send({ error: 'Failed to fetch bus stop' });
        }
    },

    async create(request: FastifyRequest<{ Body: any }>, reply: FastifyReply) {
        try {
            const newStop = await miniBusStopService.create(request.body);
            return reply.status(201).send(newStop);
        } catch (error) {
            return reply.status(500).send({ error: 'Failed to create bus stop' });
        }
    },

    async update(request: FastifyRequest<{ Params: { id: number }, Body: any }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            const updatedStop = await miniBusStopService.update(id, request.body);
            if (!updatedStop) {
                return reply.status(404).send({ error: 'Bus stop not found' });
            }
            return reply.send(updatedStop);
        } catch (error) {
            return reply.status(500).send({ error: 'Failed to update bus stop' });
        }
    },

    async delete(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
        const { id } = request.params;
        try {
            const deletedStop = await miniBusStopService.delete(id);
            if (!deletedStop) {
                return reply.status(404).send({ error: 'Bus stop not found' });
            }
            return reply.send({ message: 'Bus stop deleted successfully' });
        } catch (error){
           return reply.status(500).send({ error: 'Failed to delete bus stop' });
        }
    }
};