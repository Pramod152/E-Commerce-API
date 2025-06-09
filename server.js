const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/eCommerse").then(() => {
  console.log("connection successful...");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
