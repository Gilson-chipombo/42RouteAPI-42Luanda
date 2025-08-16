import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const cadeteService = {
    async findAll(){
        return prisma.cadetes.findMany();
    },

    async findById(id: number){
        return prisma.cadetes.findUnique({where: {id}});
    },

    async create(data: any){
        return prisma.cadetes.create({data});
    },
    async update(id: number, data: any){
        return prisma.cadetes.update({
            where: {id},
            data
        });
    },

    async delete(id: number){
        return prisma.cadetes.delete({
            where: {id}
        });
    }
};