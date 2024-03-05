import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  const [loginWith, setLoginWith] = useState("email"); // loginWith tanımı

  const navigate = useNavigate();
  //.env kullanimi
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLoginWithChange = () => {
    // setLoginWith(e.target.value);
    // e.target.checked = false;
    setLoginWith((prevLoginWith) =>
      prevLoginWith === "email" ? "username" : "email"
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); //nameye göre eşleştirme yap örn username ise usernameye göre, passwordsa passworda göre
  };

  //!login apiye istek atma
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        message.success("Giriş islemi basarili");
        if (data.role === "admin") {
          window.location.href = "/admin";
        } else {
          navigate("/");
        }
      } else {
        message.error("Giriş işlemi başarisiz");
      }
    } catch (error) {
      console.log("Giriş hatasi", error);
    }
  };

  return (
    <div className="account-column">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            <span>
              Login with {loginWith !== "email" ? "Email address" : "Username"}{" "}
              <input
                className=""
                type="checkbox"
                name="loginWith"
                value={
                  loginWith === "email" ? formData.email : formData.username
                }
                checked={loginWith === "email" ? !"username" : !loginWith}
                onChange={handleLoginWithChange}
              />
            </span>
            <span>
              {loginWith === "email" ? "Email address" : "Username"}{" "}
              <span className="required">*</span>
            </span>
            <input
              type="text"
              name={loginWith === "email" ? "email" : "username"}
              value={loginWith === "email" ? formData.email : formData.username}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        {/* <div>
          <label>
            <input
              type="radio"
              name="loginWith"
              value="email"
              checked={loginWith === "email"}
              onChange={handleLoginWithChange}
            />
            Email
          </label>
          <label>
            <input
              type="radio"
              name="loginWith"
              value="username"
              checked={loginWith === "username"}
              onChange={handleLoginWithChange}
            />
            Username
          </label>
        </div> */}
        <p className="remember">
          <label>
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <button className="btn btn-sm">Login</button>
        </p>
        <a href="#" className="form-link">
          Lost your password?
        </a>
      </form>
    </div>
  );
};

export default Login;
