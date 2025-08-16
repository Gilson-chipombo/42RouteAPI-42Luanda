import { FastifyReply, FastifyRequest } from "fastify";
import { cadeteService } from "./cadete.service";

export const cadetesController = {
    async getAll(req: FastifyRequest, reply: FastifyReply) {
        const cadetes = await cadeteService.findAll();
        reply.send(cadetes);
    },

    async getById(req: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
        const cadete = await cadeteService.findById(req.params.id);
        if (!cadete)
            return reply.status(404).send({ message: "Cadete não encontrado" });
        reply.send(cadete);
    },
    async create(req: FastifyRequest<{ Body: any }>, reply: FastifyReply) {
        const newCadete = await cadeteService.create(req.body);
        reply.status(201).send(newCadete);
    },
    async update(req: FastifyRequest<{ Params: { id: number }, Body: any }>, reply: FastifyReply) {
        const cadete = await cadeteService.update(req.params.id, req.body);
        reply.send(cadete)
    },
    async delete(req: FastifyRequest<{Params: { id: number } }>, reply: FastifyReply) {
        await cadeteService.delete(req.params.id);
        reply.status(204).send();
    }
};