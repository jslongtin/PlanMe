import React, { useState } from "react";
import "./login.css";
import { useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const history = useHistory();
  const [pwdError, setPwdError] = useState(false);

  let handleLogin = async (e) => {
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
      console.log(data);
      setUser(email);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("email", email);
      console.log(data.username);
      console.log(data.email);
      history.push("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  let register = () => {
    history.push("/register");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-700 text-gray-50 py-6">
        <h1 className="text-4xl font-bold text-center">PlanMe</h1>
      </header>
      <div className="flex-grow bg-green-200 flex items-center justify-center">
        <div className="bg-teal-900 p-10 rounded-lg shadow-2xl w-96">
          <h1 className="text-3xl font-bold mb-10 text-center text-gray-50">
            Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold text-green-500"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full p-3 rounded-lg bg-white border border-green-50 focus:outline-none focus:border-green-400"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-bold text-green-500 "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full p-3 rounded-lg bg-white border border-green-50 focus:outline-none text-black focus:border-green-400"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className=" py-3 px-6 bg-green-50 text-green font-bold rounded-full hover:bg-ash focus:outline-none text-black focus:bg-green-400"
              >
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-8">
            <button
              onClick={register}
              className="text-gray-500 font-semibold hover:text-green-700 focus:outline-none "
            >
              Don't have an account? Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
