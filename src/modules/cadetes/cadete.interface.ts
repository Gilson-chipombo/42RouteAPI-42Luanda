
import { FastifyInstance } from 'fastify';
export interface Cadete {
    id: number;
    name: string;
    email: string;
    phone: string;
    passwrd: string; 
    created_at: Date;
}
