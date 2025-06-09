const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productsId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },
    statue: {
      type: String,
      default: "pending",
    },
  },
  ////////////////////----------////////////////
  { timestamps: true }
);
const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
