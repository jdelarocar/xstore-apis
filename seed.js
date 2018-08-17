const { Category } = require("./models/category");
const { Product } = require("./models/product");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Sports",
    products: [
      { name: "Soccer Ball", numberInStock: 5, price: 1 },
      { name: "Batting Gloves", numberInStock: 10, price: 1 },
      { name: "Tennis", numberInStock: 15, price: 3 }
    ]
  },
  {
    name: "Books",
    products: [
      { name: "Book of X", numberInStock: 5, price: 4 },
      { name: "Magazine", numberInStock: 10, price: 2 },
      { name: "Kindle Book", numberInStock: 15, price: 1 }
    ]
  },
  {
    name: "Automotive Parts",
    products: [
      { name: "Tires", numberInStock: 5, price: 4 },
      { name: "Accesories", numberInStock: 10, price: 2 },
      { name: "Coolant", numberInStock: 15, price: 1 }
    ]
  },
  {
    name: "Toys and Games",
    products: [
      { name: "Action Figure", numberInStock: 5, price: 5 },
      { name: "Wagon", numberInStock: 10, price: 3 },
      { name: "Video Game", numberInStock: 15, price: 4 }
    ]
  }
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Product.deleteMany({});
  await Category.deleteMany({});

  for (let category of data) {
    const { _id: categoryId } = await new Category({
      name: category.name
    }).save();
    const products = category.products.map(product => ({
      ...product,
      category: { _id: categoryId, name: category.name }
    }));
    await Product.insertMany(products);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
