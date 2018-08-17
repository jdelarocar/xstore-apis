const Joi = require("joi");
const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      }
    }),
    required: true
  },
  product: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
      },
      price: {
        type: Number,
        required: true,
        min: 1,
        max: 255
      }
    }),
    required: true
  },
  saleDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  saleTotal: {
    type: Number,
    min: 1
  }
});

saleSchema.statics.lookup = function(customerId, productId) {
  return this.findOne({
    "customer._id": customerId,
    "product._id": productId
  });
};

saleSchema.methods.total = function() {
  this.saleTotal = this.quantity * this.product.price;
};

const Sale = mongoose.model("Sale", saleSchema);

function validateSale(sale) {
  const schema = {
    customerId: Joi.objectId().required(),
    productId: Joi.objectId().required(),
    quantity: Joi.number().required()
  };

  return Joi.validate(sale, schema);
}

exports.Sale = Sale;
exports.validate = validateSale;
