import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createOrder = async (orderData) => {
  return prisma.order.create(orderData);
};

export const getOrders = async () => {
  return prisma.order.findMany({
    include: {
      orderItems: {
        include: { item: true },
      },
    },
  });
};