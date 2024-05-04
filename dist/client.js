import { PrismaClient } from '@prisma/client';
import config from './config/config.js';
const prisma = global.prisma || new PrismaClient();
if (config.env === 'development')
    global.prisma = prisma;
export default prisma;
