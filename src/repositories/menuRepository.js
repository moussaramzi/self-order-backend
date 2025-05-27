import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getMenus = async () => {
  return prisma.menu.findMany();
};

export const createMenu = async (data) => {
  return prisma.menu.create({ data });
};