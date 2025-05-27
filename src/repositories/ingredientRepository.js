import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getIngredients = async () => {
  return prisma.ingredient.findMany();
};

export const createIngredient = async ({ name, price }) => {
  return prisma.ingredient.create({
    data: { name, price },
  });
};