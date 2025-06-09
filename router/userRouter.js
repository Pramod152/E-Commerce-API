const express = require("express");
const router = express.Router();

const getAllData = (req, res) => {
  res.send("get all data");
};
const createData = (req, res) => {
  const username = req.body.username;
  res.send(username);
};
const updateData = (req, res) => {
  res.send("created new data");
};
const deleteData = (req, res) => {
  res.send("created new data");
};
// router.get("/", getAllData);
router.post("/create", createData);
router.patch("/update", updateData);
router.delete("/delete", deleteData);

router.route("/").get(getAllData);
module.exports = router;
