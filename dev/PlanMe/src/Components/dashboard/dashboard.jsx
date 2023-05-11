import React, { useState } from "react";
import Navbar from "../Navbar/navbar";
import Page from "../Pages/page";
import "./dashboard.css";

function Dashboard() {
  return (
    <div id="dashboard">
      <div className="h-screen" id="navBarContainer">
        <Navbar />
      </div>

      <div className="h-screen" id="pageContainer">
        <Page />
      </div>
    </div>
  );
}

export default Dashboard;
