import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Categories
  const burgerCategory = await prisma.category.create({
    data: { name: 'Burgers' },
  });

  const pizzaCategory = await prisma.category.create({
    data: { name: 'Pizzas' },
  });

  const bbqCategory = await prisma.category.create({
    data: { name: 'BBQ' },
  });

  // 2. Create Ingredients
  const bacon = await prisma.ingredient.create({ data: { name: 'Bacon', price: 1.5 } });
  const cheese = await prisma.ingredient.create({ data: { name: 'Cheese', price: 1.0 } });
  const tomato = await prisma.ingredient.create({ data: { name: 'Tomato', price: 0.5 } });
  const onion = await prisma.ingredient.create({ data: { name: 'Onion', price: 0.3 } });

  // 3. Create Items
  const classicBurger = await prisma.item.create({
    data: {
      name: 'Classic Burger',
      price: 7.99,
      categoryId: burgerCategory.id,
      itemIngredients: {
        create: [
          { ingredientId: bacon.id },
          { ingredientId: cheese.id },
          { ingredientId: tomato.id },
        ],
      },
    },
  });

  const bbqChickenPizza = await prisma.item.create({
    data: {
      name: 'BBQ Chicken Pizza',
      price: 12.99,
      categoryId: pizzaCategory.id,
      itemIngredients: {
        create: [
          { ingredientId: cheese.id },
          { ingredientId: onion.id },
        ],
      },
    },
  });

  const bbqRibs = await prisma.item.create({
    data: {
      name: 'BBQ Ribs',
      price: 15.99,
      categoryId: bbqCategory.id,
      itemIngredients: {
        create: [
          { ingredientId: bacon.id },
          { ingredientId: onion.id },
        ],
      },
    },
  });

  // 4. Create a Menu
  await prisma.menu.create({
    data: {
      name: 'Burger Combo',
      price: 11.99,
      menuItems: {
        create: [
          { itemId: classicBurger.id },
        ],
      },
    },
  });

  console.log('Database has been seeded! 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
