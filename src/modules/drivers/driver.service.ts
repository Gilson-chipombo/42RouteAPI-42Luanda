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