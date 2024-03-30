"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      alert("all fields are required");
      return;
    }
    axios
      .post("https://lime-dugong-sari.cyclic.app/user/register", formData)
      .then((res) => {
        alert("user registration successful");
        router.push("/");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };

  return (
    <div className="loginContainer">
      <h3>Register Page</h3>
      <div className="loginDiv">
        <input
          type="text"
          placeholder="Type your name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
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
        <button className="loginBtn" onClick={handleRegister}>
          Sign Up
        </button>
      </div>
      <p>
        Already have an account?{" "}
        <button onClick={() => router.push("/")} className="signup-btn">
          Login to App
        </button>
      </p>
    </div>
  );
};

export default Page;
