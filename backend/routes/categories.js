const express = require("express");
//route dosyalarını inşa edebilmek icin;
const router = express.Router();

//!Tüm kategorileri getirme (Read-All)
router.get("/", async (req, res) => {
  res.send("Kategoriler getirildi");
});

//common js ile export etme
module.exports = router;
