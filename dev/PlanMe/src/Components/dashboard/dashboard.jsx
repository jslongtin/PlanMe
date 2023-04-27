import React, { useState } from "react";
import Navbar from "../Navbar/navbar";
import Page from "../Pages/page";
import "./dashboard.css";

function Dashboard() {
  const [activePage, setActivePage] = useState(0); // index of the currently active page

  return (
    <div id="dashboard">
      <div id="navBarContainer">
        <Navbar setActivePage={setActivePage} />
      </div>
      <div id="pageContainer">
        <Page activePage={activePage} />
      </div>
    </div>
  );
}

export default Dashboard;{}