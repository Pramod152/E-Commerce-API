const express = require("express");
const app = express();
const userRoute = require("./router/userRouter");
const authRoute = require("./router/auth");
const ProductRoute = require("./router/product");
const OrderRoute = require("./router/order");
const CartRoute = require("./router/cart");

app.use(express.json());

///////------------------------///////
app.use("/", userRoute);
app.use("/auth", authRoute);
app.use("/api/products", ProductRoute);
app.use("/api/carts", CartRoute);
app.use("/api/orders", OrderRoute);

module.exports = app;
