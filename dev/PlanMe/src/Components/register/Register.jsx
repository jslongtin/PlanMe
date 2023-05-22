/***************************************************** 
    Fichier: Register.jsx
    Contexte: Création d'un utilisateur avec la base de données
    Auteurs: Jessika Longtin et Finnegan Simpson
 *****************************************************/
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pwdError, setPwdError] = useState(false);

  const history = useHistory();

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
      history.push("/login");
    } else {
      alert("Registration failed");
    }
  };

  let validatePassword = () => {
    const validPassword = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^ws]).{8,}$"
    ); //ref : https://www.tutorialspoint.com/regex-in-reactjs

    if (!validPassword.test(password)) {
      setPwdError(true);
    }
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
    }
  };

  let login = () => {
    history.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-700 text-gray-50 py-6">
        <h1 className="text-4xl font-bold text-center">PlanMe</h1>
      </header>
      <div className="flex-grow bg-green-200 flex items-center justify-center">
        <div className="bg-teal-900 p-10 rounded-lg shadow-2xl w-96">
          <h1 className="text-3xl font-bold mb-10 text-center text-gray-50">
            Register
          </h1>
          <form onSubmit={handleRegister}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full p-3 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:border-gray-500 text-black"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Username
              </label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full p-3 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:border-gray-500 text-black"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full p-3 rounded-lg bg-gray-100 border border-transparent focus:outline-none focus:border-gray-500 text-black"
              />
            </div>
            <div className="text-center">
              <button
                onClick={validatePassword}
                type="submit"
                className="py-3 px-6 bg-gray-900 text-white font-bold rounded-full hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
              >
                Register
              </button>
            </div>
          </form>
          <div className="text-center mt-8">
            <button
              onClick={login}
              className="text-gray-600 font-semibold hover:text-gray-800 focus:outline-none"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
