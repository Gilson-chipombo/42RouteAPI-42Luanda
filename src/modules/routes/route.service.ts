import { PrismaClient } from "@prisma/client";
import { Routes, RouteStops } from "./route.interface";

const prisma = new PrismaClient();

export const routeService = {

  async createRoute(data: Routes) {
    return prisma.routes.create({
      data: {
        route_name: data.route_name,
        description: data.description,
      }
    });
  },

  async addStopsToRoute(
    routeId: number,
    data: RouteStops
  ) {
    return prisma.routes.update({
      where: { id: routeId },
      data: {
        stops: {
          create: data.stop_id.map((stopId, index) => ({
            stop_id: stopId,
            position: stopId + index
          }))
        }
      },
      include: {
        stops: {
          include: {
            stop: true
          }
        }
      }
    });
  },

  async listRoutes() {
    return prisma.routes.findMany({
      include: {
        stops: {
          include: {
            stop: true
          }
        }
      }
    });
  }
};
