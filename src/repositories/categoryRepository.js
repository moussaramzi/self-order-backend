import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCategories = async () => {
  return prisma.category.findMany();
};

export const createCategory = async ({ name }) => {
  return prisma.category.create({
    data: { name },
  });
};