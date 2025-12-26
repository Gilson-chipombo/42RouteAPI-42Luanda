import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { Routes, RouteStops } from "./route.interface"

export const routeService = {
  async createRoute(data: Routes) {
    return prisma.routes.create({data});
  },

  async addStopsToRoute(routeId: number, data: RouteStops) {
    return prisma.routes.update({
      where: { id: routeId },
      data: {
        stops: {
          connect: data.stopIds.map(id => ({ id }))
        }
      },
      include: {
        stops: true
      }
    });
  },

  async listRoutes() {
    return prisma.routes.findMany({
      include: {
        stops: true
      }
    });
  }
}
