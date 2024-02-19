const mongoose = require("mongoose");

const CouponSchema = mongoose.Schema(
  {
    code: { type: String, required: true },
    discountPercent: { type: Number, required: true }, //indirim orani
  },
  { timestamps: true }
);

//export etme
const Coupon = mongoose.model("Coupon", CouponSchema);

module.exports = Coupon;
