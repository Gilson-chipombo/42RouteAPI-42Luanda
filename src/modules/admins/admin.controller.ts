import { FastifyReply, FastifyRequest } from "fastify";
import { adminService } from "./admin.service";
import bcrypt from "bcryptjs";


export const adminsController = {
    async getAll(req: FastifyRequest, reply: FastifyReply) {
        const admins = await adminService.findAll();
        return reply.send(admins)
    },

    async getById(req: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) {
        const admin = await adminService.findById(req.params.id);
        if (!admin)
            return reply.status(404).send({ message: "admin não encontrado" });
        const { passwrd, ...safe } = admin;
        reply.send(safe);
    },

    async create(req: FastifyRequest<{ Body: {
        full_name?: string;
        username: string;
        email: string;
        passwrd: string;
        phone?: number;
        };
    }>, 
    reply: FastifyReply) {
        const { passwrd, ...rest } = req.body;
        if (!passwrd || passwrd.length < 8)
            return reply.status(400).send({ message: 'Senha deve ter pelo menos 8 caracteres.' })
        
        const hashedPassword = await bcrypt.hash(passwrd, 10);
        const newadmin = await adminService.create({...rest, passwrd: hashedPassword });
        const { passwrd: _omit, ...safeadmin } = newadmin;
        reply.status(201).send(safeadmin);
    },

    async update(req: FastifyRequest<{ Params: { id: number }, Body: any }>, reply: FastifyReply) {
        const admin = await adminService.update(req.params.id, req.body);
        reply.send(admin)
    },
    async delete(req: FastifyRequest<{Params: { id: number } }>, reply: FastifyReply) {
        await adminService.delete(req.params.id);
        reply.status(204).send();
    },

    async login(
    req: FastifyRequest<{ Body: { usernameOrEmail: string; passwrd: string } }>,
    reply: FastifyReply
  ) {
    const { usernameOrEmail, passwrd } = req.body
    const user = await adminService.findByUsernameOrEmail(usernameOrEmail)

    if (!user) return reply.status(401).send({ message: 'Credenciais inválidas' })

    const ok = await bcrypt.compare(passwrd, user.passwrd ?? '')
    if (!ok) return reply.status(401).send({ message: 'Credenciais inválidas' })

    // se tiver @fastify/jwt registrado, pode emitir token aqui:
    // const token = reply.jwtSign({ sub: user.id, role: 'admin' })
    const { passwrd: _omit, ...safe } = user
    return reply.send({ user: safe /*, token*/ })
  }
};