const express = require("express");
//route dosyalarını inşa edebilmek icin;
const router = express.Router();
//veritabanına kaydetmek için modeli import ediyoruz
const Category = require("../models/Category.js");

//!Kategori oluşturma (CREATE)
router.post("/", async (req, res) => {
  try {
    // const myData = req.body;
    const { name, img } = req.body;
    //
    // console.log(myData);
    // console.log(name);
    // console.log(img);
    //işlemler başarılı artık veritabanına kaydediyoruz bunun için import edeceğiz
    //!veritabanına kaydetme işlemi
    const newCategory = new Category({ name, img });
    await newCategory.save();
    res.status(201).json(newCategory);

    // res.status(200).send("OK");
  } catch (error) {
    console.log(error);
  }
});

//!Tüm kategorileri getirme (Read-All) (GET)
router.get("/", async (req, res) => {
  res.send("Kategoriler getirildi");
});

//common js ile export etme
module.exports = router;
