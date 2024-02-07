// console.log("hello world!");

// const x = 5,
//   y = 7;

// console.log(x + y);

//! EXPRESS
const express = require("express"); //common js yapısı githubda vs sık kullanılıyor  normalde farklı import yolları da var
//mongoose kurulumu
const mongoose = require("mongoose");
//appı oluşturma
const app = express(); //tüm server bu app üzerinde gerçekleşecek
//port oluşturma
const port = 5000;
//dotenv içerisine ulaşma ve config
const dotenv = require("dotenv");

dotenv.config();
//artık connect işlemini dotenv içindeki değişken ile yapabiliriz

//!main route (index.js) import etme
const mainRoute = require("./routes/index.js");

//!mongoose connect
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

//!veriyi getirmek/okumak
//* / route
//* request ve response parametre olarak veriliyor
// app.get("/", (req, res) => {
//   //req istek, res cevap için kullanılır
//   res.send("Hello Express Js");
// });

// app.get("/api", (req, res) => {
//   res.send("This is Api Route");
// });

//artik main route kullanacağız yukardakiler örnekti
app.use("/api", mainRoute);

//port dinleme
app.listen(port, () => {
  //connecti listende kullanıyoruz
  connect();
  console.log(`Sunucu ${port} portunda çalışıyor.`);
});
