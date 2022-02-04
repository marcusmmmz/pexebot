import { PrismaClient } from "@prisma/client";

export let prisma = new PrismaClient();
let db = prisma;

export default db;
