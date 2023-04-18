import React, { useState } from "react";
import "./register.css";

//ref : https://legacy.reactjs.org/docs/hooks-state.html & open ai

const Register = ({ onPageChange }) => {
  const [email, setEmail] = useState(""); 
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:3001/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });
    if (response.ok) {
      console.log({ email, username, password });
      alert("Registration successful");
      window.location.href = "/login";
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="form-container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
          Nom:
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
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
        <button type="submit">Register</button>
      </form>
      <button onClick={() => onPageChange("login")}>login</button>
    </div>
  );
};

export default Register;
