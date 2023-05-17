import React, { useState } from "react";
import Navbar from "../Navbar/navbar";
import Page from "../Pages/page";
import "./dashboard.css";
import { Route } from "react-router-dom";

function Dashboard() {
  return (
    <div id="dashboard">
      <div className="h-screen" id="navBarContainer">
        <Navbar />
      </div>

      <div className="h-screen" id="pageContainer">
        <Route path="/dashboard/:pageId" component={Page} />
      </div>
    </div>
  );
}

export default Dashboard;
