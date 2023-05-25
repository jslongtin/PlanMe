/***************************************************** 
  Fichier: Home.jsx
  Contexte: Page d'acceuille lien vers login et register
  Auteur: Finnegan Simpson et Jessika Longtin
 *****************************************************/
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import greeenLeafImage from "../../assets/images/greeen_leaf.png";
import budget from "../../assets/images/budget.png";
import note from "../../assets/images/note.png";
import profile from "../../assets/images/user_profile.png";
import cal_day from "../../assets/images/cal_day.png";
import cal_week from "../../assets/images/cal_week.png";
import cal_month from "../../assets/images/cal_month.png";

function Home() {
  const history = useHistory();
  const btnLogin = () => {
    history.push("/login");
  };
  const btnRegister = () => {
    history.push("/register");
  };
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-green-700 text-gray-50 py-6">
        <h1 className="text-4xl font-bold text-center">PlanMe</h1>
      </header>
      <div className="flex-grow bg-green-200 p-1">
        <button
          onClick={btnLogin}
          className=" py-3 px-6 bg-green-50 text-green font-bold rounded-full hover:bg-ash focus:outline-none text-black focus:bg-green-400"
        >
          Login
        </button>
        <button
          onClick={btnRegister}
          className=" py-3 px-6 bg-green-50 text-green font-bold rounded-full hover:bg-ash focus:outline-none text-black focus:bg-green-400"
        >
          Register
        </button>
      </div>
      <div className="flex-grow bg-green-200 flex items-center justify-center">
        <div className="bg-teal-900 p-10 rounded-lg shadow-2xl w-100 h-100">
          <img
            src={greeenLeafImage}
            alt="home image"
            className="mx-auto w-48 h-48"
          />
          <img
            src={cal_day}
            alt="home image"
            className="mx-auto"
          />
          <img
            src={budget}
            alt="home image"
            className="mx-auto"
          />
          <img
            src={note}
            alt="home image"
            className="mx-auto "
          />
          <div className="text-center mt-5"></div>
          <div className="text-center mt-5"></div>
        </div>
      </div>
    </div>
  );
}
export default Home;
