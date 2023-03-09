import React, { useState } from "react";
import "./css/register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    // Send registration request to backend
    alert("Registration successful"); // Show success message if registration is successful
    window.location.href = "/login"; // Redirect to login page after successful registration
  };
  //   const handleRegister = async (e) => {
  //     e.preventDefault();
  //     // Send registration request to backend
  //     const response = await fetch("/register", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     if (response.ok) {
  //       alert("Registration successful"); // Show success message if registration is successful
  //       window.location.href = "/login"; // Redirect to login page after successful registration
  //     } else {
  //       alert("Registration failed"); // Show error message if registration fails
  //     }
  //   };

  return (
    <div>
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
    </div>
  );
};

export default Register;
