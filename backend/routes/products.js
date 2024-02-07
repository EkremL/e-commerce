const express = require("express");
//route dosyalarını inşa edebilmek icin;
const router = express.Router();

//!Tüm ürünleri getirme (Read-All)
router.get("/", async (req, res) => {
  res.send("Ürünler getirildi");
});

//common js ile export etme
module.exports = router;
