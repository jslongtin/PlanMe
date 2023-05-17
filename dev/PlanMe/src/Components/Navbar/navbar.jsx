import React, { useState } from "react";
import "./navbar.css";
import PhotoDeProfil from "../photoDeProfil/photoDeProfil";
import { Link, Route, Switch } from "react-router-dom";
import Search from "../search/search";
import Page from "../Pages/page";
import pageProfile from "../Utilisateur/UtilisateurTailwaind";
import { useHistory } from "react-router-dom";


function Navbar({ setActivePage }) {
  const [pages, setPages] = useState(0); // array of page objects with unique ids
  const [newPageForm, setNewPageForm] = useState(false); // used to open the form to create a new page
  const [newPageTitle, setNewPageTitle] = useState(""); // used to store the title of the new page
  const history = useHistory();
  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");

  // const handleNewPage = () => {
  //   // add a new page object to the pages array
  //   const newPage = { id: pages.length };
  //   setPages([...pages, newPage]);

  //   // update the active page to the newly created page
  //   setActivePage(newPage.id);
  // };
  // TODO a verifier les id de page avec la bd

  let handleNewPage = async (e) => {
    e.preventDefault();
    let utilisateur = sessionStorage.getItem("email");
    let title = "page " + pages;
    setNewPageTitle(title);
    if (newPageTitle.trim() === "") {
      // trim() ref : chatgpt
      alert("Please enter a title for the new page");
      return;
    }

    const response = await fetch("http://127.0.0.1:3001/api/newPage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ utilisateur, title }),
    });

    if (response.ok) {
      let li = document.createElement("li");
      li.innerHTML = "Page " + pages;
      li.addEventListener("click", () => {
        sessionStorage.setItem("activePage", pages);
      });
      document.getElementById("pageList").append(li);
      setPages(pages + 1);
    } else {
      alert("Invalid email or password");
    }
  };

  const logout = () => {
    sessionStorage.clear();
    history.push("/");
  };

  return (
    <div id="menuBar">
      <div id="menuTopSection">
        <div id="uiUser">
          <PhotoDeProfil />
          <div id="navBarUsername">{username}'s PlanMe</div>
        </div>

        <div className="search w-50 h-50">
          <Search />
        </div>

        <button onClick={() => logout()}>Logout</button>
      </div>

      <div id="menuPages">
        <button onClick={handleNewPage}>New Page</button>
        <ul id="pageList">
          {/* {pages.map((page) => (
            <li key={page.id}>
              <Link to={`/page/${page.id}`}>Page {page.id}</Link>
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
