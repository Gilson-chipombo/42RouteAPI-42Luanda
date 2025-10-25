// src/auth/fortytwo.ts
import Fastify, { FastifyInstance } from "fastify";
import OAuth2 from "simple-oauth2";

export async function register42Auth(app: FastifyInstance) {
  const config = {
    client: {
      id: process.env.FORTYTWO_CLIENT_ID!,
      secret: process.env.FORTYTWO_CLIENT_SECRET!,
    },
    auth: {
      tokenHost: "https://api.intra.42.fr",
      tokenPath: "/oauth/token",
      authorizePath: "/oauth/authorize"
    }
  };

  const client = new OAuth2.AuthorizationCode(config);

  app.get("/auth/42", async (request, reply) => {
    const redirectUri = `${process.env.APP_URL}/auth/42/callback`;
    const authorizationUri = client.authorizeURL({
      redirect_uri: redirectUri,
      scope: "public", // ajusta conforme precisa
      state: "someRandomState"
    });
    reply.redirect(authorizationUri);
  });

  app.get("/auth/42/callback", async (request, reply) => {
    const { code, state } = request.query as any;
    const redirectUri = `${process.env.APP_URL}/auth/42/callback`;
    try {
      const tokenParams = {
        code: code,
        redirect_uri: redirectUri,
        scope: "public"
      };
      const accessToken = await client.getToken(tokenParams);
      const token = accessToken.token.access_token;

      // Obter perfil do utilizador via API da 42
      const res = await fetch("https://api.intra.42.fr/v2/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const profile = await res.json();

      // Aqui processos: procura ou cria user na tua BD
      // Gerar o teu próprio JWT com dados do perfil
      // Exemplo fictício:
      //const jwt = createYourJWT({ id42: profile.id, email: profile.email });

      //reply.send({ jwt });
    } catch(error) {
      reply.send(error);
    }
  });
}
