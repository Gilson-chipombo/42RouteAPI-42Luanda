import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.service";

export class AuthController {
  static async redirectTo42(request: FastifyRequest, reply: FastifyReply) {
    const url = await AuthService.generateAuthUrl();
    return reply.redirect(url);
  }

  static async callback42(request: FastifyRequest, reply: FastifyReply) {
    const { code } = request.query as { code: string };

    const profile = await AuthService.handleCallback(code);

    return reply.send({
        authenticated: true,
        profile,
      });
    }
  /*static async callback42(request: FastifyRequest, reply: FastifyReply) {
    const { code } = request.query as { code: string };
    //const { user, token } = await AuthService.handleCallback(code);
    const { token } = await AuthService.handleCallback(code);
    //return reply.send({ user, token });
    
    console.log(token);
    return reply.send({token });
  }*/
}
