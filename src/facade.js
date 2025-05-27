import * as orderRepository from "./repositories/orderRepository.js";
import * as menuRepository from "./repositories/menuRepository.js";
import * as itemRepository from "./repositories/itemRepository.js";
import * as ingredientRepository from "./repositories/ingredientRepository.js";
import * as categoryRepository from "./repositories/categoryRepository.js";


//orders
export const createOrder = async (items) => {
  const orderData = {
    data: {
      orderItems: {
        create: items.map(itemId => ({ itemId, basePrice: 10 })),
      },
    },
  };
  return orderRepository.createOrder(orderData);
};

export const getOrders = async () => {
  return orderRepository.getOrders();
};

//Menus
export const getMenus = async () => {
  return menuRepository.getMenus();
};

export const createMenu = async (name, price, imageUrl) => {
  return menuRepository.createMenu({ name, price, imageUrl });
};

//Items
export const getItems = async (categoryId) => {
  return itemRepository.getItems(categoryId);
};

export const getItemIngredients = async (itemId) => {
  const itemIngredients = await itemRepository.getItemIngredients(itemId);
  return itemIngredients.map(ii => ii.ingredient);
};

export const createItem = async ({ name, price, categoryId, ingredients, imageUrl }) => {
  return itemRepository.createItem({ name, price, categoryId, ingredients, imageUrl });
};

//ingredients
export const getIngredients = async () => {
  return ingredientRepository.getIngredients();
};

export const createIngredient = async ({ name, price }) => {
  return ingredientRepository.createIngredient({ name, price });
};

// Categories
export const getCategories = async () => {
  return categoryRepository.getCategories();
};

export const createCategory = async ({ name }) => {
  return categoryRepository.createCategory({ name });
};