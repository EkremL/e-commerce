const express = require("express");
const router = express.Router();

//bu dosyada diğer route işlemlerini ve dosyaları toplayacağız

//! Diğer route dosyalarını içe aktarma
const productRoute = require("./products.js");
const categoryRoute = require("./categories.js");
const authRoute = require("./auth.js");

//! her routeyi ilgili yol altında kullanma

router.use("/categories", categoryRoute); //ilk kısım hangi patha istek atılcağı, ikincisi de hangi dosya için olacağını belirttik
router.use("/products", productRoute);
router.use("/auth", authRoute);

//!export etme
module.exports = router;
