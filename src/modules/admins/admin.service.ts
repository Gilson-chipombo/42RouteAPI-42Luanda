import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const adminService = {
    async findAll(){
        return prisma.admins.findMany();
    },

    async findById(id: number){
        return prisma.admins.findUnique({where: {id}});
    },

    async create(data: any){
        return prisma.admins.create({data});
    },
    async update(id: number, data: any){
        return prisma.admins.update({
            where: {id},
            data
        });
    },

    async delete(id: number){
        return prisma.admins.delete({
            where: {id}
        });
    },
    
    findByUsernameOrEmail(usernameOrEmail: string) {
    return prisma.admins.findFirst({
      where: {
        OR: [
          { username: usernameOrEmail },
          { email: usernameOrEmail }
        ]
      }
    })
  }
};