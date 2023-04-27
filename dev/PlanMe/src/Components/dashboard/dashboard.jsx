import React, { useState } from "react";
import Navbar from "../Navbar/navbar";
import Page from "../Pages/page";
import { Link, Route, Switch } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
  const [pages, setPages] = useState([{ id: 0 }]); // define the pages array

  const [activePage, setActivePage] = useState(0); // index of the currently active page

  const handleNewPage = () => {
    const newPage = { id: pages.length };
    setPages([...pages, newPage]);
    setActivePage(newPage.id);
  };

  return (
    <div id="dashboard">
      <div id="navBarContainer">
        <Navbar pages={pages} onNewPage={handleNewPage} setActivePage={setActivePage} />
      </div>
      <Switch>
        {pages.map((page) => (
          <Route key={page.id} path={`/page/${page.id}`}>
            <Page page={page} />
          </Route>
        ))}
      </Switch>
      <div id="pageContainer">
        <Page activePage={activePage} />
      </div>
    </div>
  );
}

export default Dashboard;
