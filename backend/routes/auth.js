const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
//bcrypt import ediyoruz
const bcrypt = require("bcryptjs");

//! Kullanici oluşturma (Create - Register)

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //? aynı e-mail var mı checkleme işlemi
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    //? Bcrypt kullanimi
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await new User({
      username,
      email,
      password: hashedPassword, //modelin içinde password ismi olduğu için hashedpassword'u bu şekilde gönderiyoruz
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

module.exports = router;
