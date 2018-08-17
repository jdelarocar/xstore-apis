const { Sale, validate } = require("../models/sale");
const { Product } = require("../models/product");
const { User } = require("../models/user");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

Fawn.init(mongoose);

router.get("/", auth, async (req, res) => {
  const sales = await Sale.find()
    .select("-__v")
    .sort("-dateOut");
  res.send(sales);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await User.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");

  const product = await Product.findById(req.body.productId);
  if (!product) return res.status(400).send("Invalid product.");

  if (product.numberInStock < req.body.quantity)
    return res.status(400).send("Product not in stock.");

  let sale = new Sale({
    customer: {
      _id: customer._id,
      name: customer.name
    },
    product: {
      _id: product._id,
      name: product.name,
      price: product.price
    },
    quantity: req.body.quantity
  });

  sale.total();

  try {
    new Fawn.Task()
      .save("sales", sale)
      .update(
        "products",
        { _id: product._id },
        {
          $inc: { numberInStock: -sale.quantity }
        }
      )
      .run();

    res.send(sale);
  } catch (ex) {
    res.status(500).send("Something failed.");
  }
});

router.get("/:id", [auth], async (req, res) => {
  const sale = await Sale.findById(req.params.id).select("-__v");

  if (!sale)
    return res.status(404).send("The sale with the given ID was not found.");

  res.send(sale);
});

module.exports = router;
