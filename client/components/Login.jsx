"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [cookies, setCookie] = useCookies(["todoAuthToken"]);
  const router = useRouter();

  const handleLogin = () => {
    const { email, password } = formData;
    if (!email && !password) return;
    axios
      .post("https://lime-dugong-sari.cyclic.app/user/login", formData)
      .then((res) => {
        setCookie("todoAuthToken", res.data.token);
        router.push("/todo");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="loginContainer">
      <h1>Task Management App</h1>
      <div className="loginDiv">
        <input
          type="text"
          placeholder="Enter email"
          className="emailInput"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Enter password"
          className="passwordInput"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button className="loginBtn" onClick={handleLogin}>
          Login
        </button>
      </div>
      <p>
        Don't have an account?{" "}
        <button onClick={() => router.push("/register")} className="signup-btn">
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default Login;
