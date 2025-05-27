import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getItems = async (categoryId) => {
  return prisma.item.findMany({
    where: categoryId ? { categoryId } : {},
    include: {
      category: true,
      itemIngredients: {
        include: { ingredient: true }
      }
    }
  });
};

export const getItemIngredients = async (itemId) => {
  return prisma.itemIngredient.findMany({
    where: { itemId },
    include: { ingredient: true }
  });
};

export const createItem = async ({ name, price, categoryId, ingredients }) => {
  const item = await prisma.item.create({
    data: {
      name,
      price,
      categoryId,
      itemIngredients: {
        create: ingredients.map(ingredientId => ({
          ingredientId,
        })),
      },
    },
  });

  return prisma.item.findUnique({
    where: { id: item.id },
    include: {
      itemIngredients: {
        include: { ingredient: true },
      },
    },
  });
};