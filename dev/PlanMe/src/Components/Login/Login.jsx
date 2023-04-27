import React, { useState } from "react";
import "./login.css";

const Login = ({ onPageChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ref : open ai
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem("username", data.username); 
      sessionStorage.setItem("email", email); 
      onPageChange("dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
        <button onClick={() => onPageChange("register")}>register</button>
      </form>
    </div>
  );
};

export default Login;
