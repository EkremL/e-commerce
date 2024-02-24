const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
//bcrypt import ediyoruz
const bcrypt = require("bcryptjs");

//!Generate random avatar

const generateRandomAvatar = () => {
  const randomAvatar = Math.floor(Math.random() * 71); //1-70 arası istersek 70 + 1 diyecektik
  //*pravatar.cc deki resimler 0 ile 70 arasında değer aldığı için
  //*biz de 0 ile 70 arasında sayı üretmesini istedik
  return `https://i.pravatar.cc/300?img=${randomAvatar}`;
};
//? const defaultAvatar = generateRandomAvatar(); //burada çağırsaydık hep aynı değer gelecekti

//! Kullanici oluşturma (Create - Register)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //?random avatar fonksiyonunu çağırma
    //burada çağırmamızın sebebi her istek attığımızda farklı değer gelebilmesidir. Yukarda çağırsaydık 1 kere oluşturulacak ve hep aynı değer gelecekti.
    const defaultAvatar = generateRandomAvatar();

    //? aynı e-mail var mı checkleme işlemi
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already in use" });
    }

    //? Bcrypt kullanimi
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword, //modelin içinde password ismi olduğu için hashedpassword'u bu şekilde gönderiyoruz
      avatar: defaultAvatar,
    });

    await newUser.save();
    res.status(201).json({
      message: "Kayıt başarılı",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//! Kullanici Girişi (Login)
router.post("/login", async (req, res) => {
  try {
    // console.log(req.body); // Gelen isteği yazdır
    const { email, username, password } = req.body;

    // //? e-mail check
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid E-mail or Password" });
    }

    // if (!userr) {
    //   return res.status(401).json({ error: "Invalid E-mail or Password" });
    // }

    //? password check
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //1. parametre kullanıcının gönderdiği yani aldığımız değer,
    //2.parametre veritabanındaki kayıtlı şifre   bunları karşılaştırıp duruma göre hata verdiriyoruz
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid E-mail or Password" });
    }

    res.status(200).json({
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// //get users test
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
