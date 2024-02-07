const mongoose = require("mongoose");

//categorynin veritabanında nasıl tutulacağını oluşturuyoruz

const CategorySchema = mongoose.Schema(
  {
    //required zorunluluğu belirtiyor
    name: { type: String, required: true },
    img: { type: String, required: true },
  },
  //timestamps ürünü oluşturduğumuzda tarih verecek
  { timestamps: true }
);

//export etme
const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
