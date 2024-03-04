const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

//stripe import / secret key
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//backenddeki nodejs ile çalışmak için npm i stripe da kurmalıyız
router.post("/", async (req, res) => {
  //bodyden gönderilen bilgileri alıyoruz
  const { products, user, cargoFee } = req.body;

  //ürünleri stripe için yeni bir formata alıyoruz
  const lineItems = products.map((product) => ({
    price_data: {
      //para birimi
      currency: "usd",
      product_data: {
        name: product.name, //modeldeki bilgi
      },
      unit_amount: Math.round(product.price * 100), //fiyatı yüzle çarpıyoruz
    },
    quantity: product.quantity,
  }));

  if (cargoFee !== 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Fast Cargo",
        },
        unit_amount: Math.round(cargoFee * 100),
      },
      quantity: 1,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN}/success`,
    });

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
