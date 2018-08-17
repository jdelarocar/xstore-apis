const express = require("express");
const categories = require("../routes/categories");
const products = require("../routes/products");
const sales = require("../routes/sales");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/categories", categories);
  app.use("/api/products", products);
  app.use("/api/sales", sales);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
