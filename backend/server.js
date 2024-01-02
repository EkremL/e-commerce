// console.log("hello world!");

// const x = 5,
//   y = 7;

// console.log(x + y);

const express = require("express"); //common js yapısı githubda vs sık kullanılıyor  normalde farklı import yolları da var
//appı oluşturma
const app = express();

//veriyi getirmek/okumak
// / route
//request ve response parametre olarak veriliyor
app.get("/", (req, res) => {
  res.send("Hello Express Js");
});

app.get("/api", (req, res) => {
  res.send("This is Api Route");
});

//port dinleme
app.listen(5000, () => {
  console.log(`Sunucu ${5000} portunda çalışıyor.`);
});
