const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon.js");

//! Coupon(Kupon) oluşturma (CREATE)
router.post("/", async (req, res) => {
  try {
    //! aynı kupon kodunu tekrar tekrar oluşturmayı engellemek için;
    const { code } = req.body;
    const existingCoupon = await Coupon.findOne({ code }); //kodu alıp daha önce oluşturulmuş mu kontrol ediyoruz
    if (existingCoupon) {
      return res.status(400).json({ error: "Coupon code already exists" });
    }

    const newCoupon = new Coupon(req.body);
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//!Tüm kuponları getirme (Read-All) (GET-ALL)
router.get("/", async (req, res) => {
  try {
    const coupons = await Coupon.find();

    res.status(200).json(coupons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//!Belirli bir Kupon getirme (GET SINGLE by coupon ID)

router.get("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const coupon = await Coupon.findById(couponId);

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//! Kupon koduna göre kupon getirme (Get single by coupon Code)
router.get("/code/:couponCode", async (req, res) => {
  try {
    const couponCode = req.params.couponCode;
    const coupon = await Coupon.findOne({ code: couponCode });

    if (!coupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }
    const { discountPercent } = coupon; //normalde kuponu da gönderebilirdik sadece indirimi göndermek için bu sekilde gösterebiliriz
    res.status(200).json({ discountPercent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//!Kupon güncelleme (UPDATE)

router.put("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updates = req.body;

    const existingCoupon = await Coupon.findById(couponId);
    if (!existingCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updates, {
      new: true,
    });
    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//!Kupon silme (DELETE)

router.delete("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;

    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

    if (!deletedCoupon) {
      return res.status(404).json({ error: "Coupon not found" });
    }

    res.status(200).json(deletedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
