const express = require("express");
//route dosyalarını inşa edebilmek icin;
const router = express.Router();
//veritabanına kaydetmek için modeli import ediyoruz
const Category = require("../models/Category.js");

//!Tüm kategorileri getirme (Read-All) (GET)
// router.get("/", async (req, res) => {
//   res.send("Kategoriler getirildi");
// });

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

//!Belirli bir kategoriyi getirme

router.get("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    try {
      const category = await Category.findById(categoryId);
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//! Kategori güncelleme (UPDATE)

router.put("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    // const { name, img } = req.body; //1. yöntem
    const updates = req.body; //2. yöntem

    //hata
    const existingCategory = Category.findById(categoryId);
    if (!existingCategory) {
      res.status(404).json({ error: "Category not found" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      // { name, img }, //1. yöntem
      updates, //2. yöntem
      //istek atınca yeni yani güncellenmiş değeri göndermek için new: true yapıyoruz
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//! Kategori silme (DELETE)

router.delete("/:categoryId", async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(deletedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//common js ile export etme
module.exports = router;
