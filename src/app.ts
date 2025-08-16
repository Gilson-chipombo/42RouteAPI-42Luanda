import Fastify       from "fastify";
import cors          from "@fastify/cors";
import swagger       from "@fastify/swagger";
import swaggerUI     from "@fastify/swagger-ui";
import prismaPlugin  from "./plugins/prisma";
import adminRoutes   from "./modules/admins/admin.routes";
import cadeteRoutes  from "./modules/cadetes/cadete.routes";
import driversRoutes from "./modules/drivers/driver.routes";
import minibusstopsRoutes from "./modules/miniBusStops/miniBusStops.routes";

export async function buildApp() {
  const app = Fastify({ logger: {
    level: 'error'
  } })

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
  app.register(adminRoutes,        { prefix: '/api' })
  app.register(cadeteRoutes,       { prefix: '/api' })
  app.register(driversRoutes,      { prefix: '/api' })
  app.register(minibusstopsRoutes, { prefix: '/api' })


  return app
}