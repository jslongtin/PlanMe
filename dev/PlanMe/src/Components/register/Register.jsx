import React, { useState } from "react";
import "./register.css";

const Register = ({ onPageChange }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    // Send registration request to backend
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, username, password }),
    });
    if (response.ok) {
      console.log({ email, username, password });
      alert("Registration successful"); // Show success message if registration is successful
      window.location.href = "/login"; // Redirect to login page after successful registration
    } else {
      alert("Registration failed"); // Show error message if registration fails
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
