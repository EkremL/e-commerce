import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); //nameye göre eşleştirme yap örn username ise usernameye göre, passwordsa passworda göre
  };
  // console.log(formData);
  //!Register apisine istek atma
  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(formData);
    // console.log("kullanici olusturuldu.");
    try {
      //postmanda kullandigimiz urlye istek atiyoruz
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST", //method tipini belirtiyoruz
        headers: {
          "Content-Type": "application/json",
        }, //postmandaki gibi json tipinde veri gönderiyoruz
        body: JSON.stringify(formData), //formdatadaki bilgileri jsona çevirip gönderiyoruz
      });

      // console.log(response);
      //denediğimizde cors hatası alacağız bunun için cors kütüphanesini indirip backende import ediyoruz.
      //?CORS: Bir web tarayıcısının bir web sayfasında yüklü kaynakların başka bir alan adından yüklenmesine veya kullanılmasına izin vermediği bir kontrol alanı ve güvenlik önlemidir.Corsu kurduktan sonra hata ortadan kalkacak ve 201 status kodunu göreceğiz.
      if (response.ok) {
        //localstorage e kaydetme
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Kayit islemi basarili");
        //anasayfaya yonlendirme
        navigate("/");
      } else {
        message.error("Kayit işlemi başarisiz");
      }
    } catch (error) {
      console.log("Kayit hatasi", error);
    }
  };

  return (
    <div className="account-column">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>
            <span>
              Username <span className="required">*</span>
            </span>
            <input type="text" onChange={handleInputChange} name="username" />
          </label>
        </div>
        <div>
          <label>
            <span>
              Email address <span className="required">*</span>
            </span>
            <input type="email" onChange={handleInputChange} name="email" />
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input
              type="password"
              onChange={handleInputChange}
              name="password"
            />
          </label>
        </div>
        <div className="privacy-policy-text remember">
          <p>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <a href="#">privacy policy.</a>
          </p>
          <button className="btn btn-sm">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
