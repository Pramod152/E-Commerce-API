const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

///////////////----Create new Order  -------////////////////////

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

/////////////////--------------update the Cart--------------//////////////
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

////////--------Delete Cart--------//////////
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

////////-----------get User Cart-------/////////
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Order = await Order.find({ userId: req.params.userId });

    res.status(200).json(Order);
  } catch (err) {
    res.status(500).json(err);
  }
});

//////////------Get All Carts------////////////
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const Order = await Order.find();
    res.status(200).json(Order);
  } catch (err) {
    res.status(500).json(err);
  }
});

/////-----Get monthly income-----/////
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  // console.log(`lastMonth:${lastMonth},previousMonth:${previousMonth}`);

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      { $project: { month: { $month: "$createdAt", sales: "$amount" } } },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err) {
    res.status(401).json(err);
  }
});
module.exports = router;
