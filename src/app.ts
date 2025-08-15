import Fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import prismaPlugin from "./plugins/prisma";

export async function buildApp() {
  const app = Fastify({ logger: true })

  await app.register(cors, { origin: '*' })

  await app.register(swagger, {
    openapi: {
      info: {
        title: '42RouteAPI-42Luanda',
        version: '1.0.0',
      },
    },
  })

  await app.register(swaggerUI, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'full' },
  })

  await app.register(prismaPlugin)

  return app
}