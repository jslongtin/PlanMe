import React, { useState } from "react";
import "./navbar.css";
import PhotoDeProfil from "../photoDeProfil/photoDeProfil";
import { Link, Route, Switch } from "react-router-dom";
import Search from "../search/search";
import Page from "../Pages/page";
function Navbar({ setActivePage }) {
  const [pages, setPages] = useState([{ id: 0 }]); // array of page objects with unique ids

  const handleNewPage = () => {
    // add a new page object to the pages array
    const newPage = { id: pages.length };
    setPages([...pages, newPage]);

    // update the active page to the newly created page
    setActivePage(newPage.id);
  };

  const logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const username = sessionStorage.getItem("username");

  return (
    <div id="menuBar">
      <div id="menuTopSection">
        <div id="uiUser">
          <button className="pdp" onClick={() => {}}>
            <PhotoDeProfil />
          </button>
          <div id="navBarUsername">{username}'s PlanMe</div>
        </div>

        <div className="search w-50 h-50">
          <Search />
        </div>

        <button onClick={() => logout()}>Logout</button>
      </div>

      <div id="menuPages">
        <button onClick={handleNewPage}>New Page</button>
        <ul>
          {pages.map((page) => (
            <li key={page.id}>
              <Link to={`/page/${page.id}`}>Page {page.id}</Link>
            </li>
          ))}
        </ul>
      </div>

      <Switch>
        {pages.map((page) => (
          <Route key={page.id} path={`/page/${page.id}`}>
            <Page />
          </Route>
        ))}
      </Switch>
    </div>
  );
}

export default Navbar;