import React, { useState } from "react";
import "./login.css";

const Login = ({ onPageChange }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="flex items-center justify-center h-screen bg-primaryColor">
      <div className="bg-secondaryColor p-10 rounded-lg shadow-2xl w-96">
        <h1 className="text-3xl font-bold mb-10 text-center text-primaryColor">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-bold text-primaryColor">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full p-3 rounded-lg bg-white border border-primaryColor focus:outline-none focus:border-thirdColor"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-bold text-primaryColor">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full p-3 rounded-lg bg-white border border-primaryColor focus:outline-none focus:border-thirdColor"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="py-3 px-6 bg-primaryColor text-green font-bold rounded-full hover:bg-ash focus:outline-none focus:bg-thirdColor"
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-8">
          <button
            onClick={() => onPageChange("register")}
            className="text-primaryColor font-semibold hover:text-thirdColor focus:outline-none"
          >
            Don't have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
