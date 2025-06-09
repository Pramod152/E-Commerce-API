const express = require("express");
const router = express.Router();
/////////////////---------------Route controller------------/////////////
const getAllData = (req, res) => {
  res.send("get all data");
};

//////////////-----------------Router--------------////////////////

router.route("/").get(getAllData);
module.exports = router;
