const Joi = require("joi");
const mongoose = require("mongoose");
const { categorySchema } = require("./category");

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255
    },
    category: {
      type: categorySchema,
      required: true
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    },
    price: {
      type: Number,
      required: true,
      min: 1,
      max: 300
    }
  })
);

function validateProduct(product) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(255)
      .required(),
    categoryId: Joi.objectId().required(),
    numberInStock: Joi.number()
      .min(0)
      .required(),
    price: Joi.number()
      .min(1)
      .required()
  };

  return Joi.validate(product, schema);
}

exports.Product = Product;
exports.validate = validateProduct;
