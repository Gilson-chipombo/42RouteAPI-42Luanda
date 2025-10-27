import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const driverService = {
    async findAll(){
        return prisma.drivers.findMany();
    },

    async findById(id: number){ 
        return prisma.drivers.findUnique({where: {id}});
    },

    async create(data: any){
        return prisma.drivers.create({data});
    },
    async update(id: number, data: any){
        return prisma.drivers.update({
            where: {id},
            data
        });
    },
    async updateLocation(id_driver: number, data: { lat: number; long: number }) {
      try {
        const existingRecord = await prisma.driverCoordinates.findUnique({
          where: { id_driver },
        });

        if (!existingRecord) {
          return await prisma.driverCoordinates.create({
            data: {
              id_driver,
              ...data,
            },
          });
        }

        return await prisma.driverCoordinates.update({
          where: { id_driver },
          data,
        });
      } catch (error) {
        console.error("Erro ao atualizar coordenadas:", error);
        throw new Error("Erro ao atualizar localização do motorista");
      }
    },

    async delete(id: number){
        return prisma.drivers.delete({
            where: {id}
        });
    },
    
    findByUsernameOrEmail(usernameOrEmail: string) {
    return prisma.drivers.findFirst({
      where: {
        OR: [
          { username: usernameOrEmail },
          { email: usernameOrEmail }
        ]
      }
    })
  }
};