import React, { useState } from "react";
import "./register.css";

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
      console.log({ email, username });
      alert("Registration successful");
      window.location.href = "/login";
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-96">
        <h1 className="text-3xl font-bold mb-10 text-center">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full p-3 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="username" className="block mb-2 text-sm font-bold text-gray-700">
              Username
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="block w-full p-3 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full p-3 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:border-gray-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="py-3 px-6 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center mt-8">
          <button
            onClick={() => onPageChange("login")}
            className="text-gray-600 font-semibold hover:text-gray-800 focus:outline-none"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
