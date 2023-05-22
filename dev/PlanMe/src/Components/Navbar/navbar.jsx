/***************************************************** 
  Fichier: Navbar.jsx
  Contexte: bare laterale de navigation contenant ses pages , deconnexion et modification profile
  Auteurs: Jessika Longtin et Finnegan Simpson
 *****************************************************/
import React, { useState, useEffect } from "react";
import "./navbar.css";
import PhotoDeProfil from "../photoDeProfil/photoDeProfil";
import { Link, Route, Switch } from "react-router-dom";
import Search from "../search/search";
// import pageProfile from "../Utilisateur/UtilisateurTailwaind";
import { useHistory } from "react-router-dom";
// import Page from "../Pages/page";

export default function Navbar({ setActivePage }) {
  const [pages, setPages] = useState([]);
  const [newPageForm, setNewPageForm] = useState(false);
  const [newPageTitre, setNewPageTitre] = useState("");
  const history = useHistory();
  const username = sessionStorage.getItem("username");
  const email = sessionStorage.getItem("email");

  // useEffect(() => {
  //   const fetchPages = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://127.0.0.1:3001/api/getPages?email=${email}`
  //       );
  //       if (response.ok) {
  //         const pages = await response.json();
  //         setPages(pages);
  //       } else {
  //         console.error(
  //           `Failed to fetch pages. Response status: ${response.status}`
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch pages:", error);
  //     }
  //   };

  //   fetchPages();
  // }, []); // Empty dependency array, so this runs once on mount

  let handleNewPage = async (e) => {
    e.preventDefault();
    let utilisateur = sessionStorage.getItem("email");
    if (newPageTitre.trim() === "") {
      // trim() ref : chatgpt
      alert("Please enter a titre for the new page");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:3001/api/newPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ utilisateur, titre: newPageTitre }),
      });

      console.log("Response status:", response.status);
      console.log("Response body:", response.body);

      if (response.ok) {
        const jsonResponse = await response.json(); // Convert response body to JSON
        console.log("Response body:", jsonResponse);
        const { id } = jsonResponse;

        let li = document.createElement("li");
        // li.innerHTML = "Page " + pages;
        li.addEventListener("click", () => {
          sessionStorage.setItem("activePage", pages);
        });

        document.getElementById("pageList").append(li);
        setNewPageForm(false);
        setPages([...pages, { id, titre: newPageTitre }]);
      } else {
        console.log(
          "Error creating a new page. Response status:",
          response.status
        );
        console.log("Response body:", await response.text());
        alert("Failed to create a new page.");
      }
    } catch (error) {
      console.error("Error creating a new page:", error);
      alert("An error occurred while creating a new page.");
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

        <div className="search w-50 h-50 relative z-0">
          <Search />
        </div>

        <button onClick={() => logout()}>Logout</button>
      </div>

      <div id="menuPages">
        <button onClick={() => setNewPageForm(true)}>New Page</button>
        <ul id="pageList">
          {pages.map((page) => (
            <li key={page.id}>
              <Link
                to={`/dashboard/${page.id}`}
                onClick={() => sessionStorage.setItem("activePage", page.id)}
              >
                {page.titre}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {newPageForm && (
        <div
          id="newPageForm"
          className="fixed inset-0 flex items-center justify-center relative z-0"
        >
          <div className="bg-green-200 p-6 rounded-lg shadow-lg relative z-0">
            <form
              onSubmit={handleNewPage}
              className="bg-green-100 p-6 rounded-lg shadow-lg relative z-0"
            >
              <input
                type="text"
                placeholder="New Page titre"
                value={newPageTitre}
                onChange={(e) => {
                  console.log("newPageTitre", newPageTitre);
                  setNewPageTitre(e.target.value);
                }}
              />
              <button
                type="submit"
                className="bg-green-200 p-6 rounded-lg shadow-lg relative z-0"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => {
                  setNewPageForm(false);
                  setNewPageTitre("");
                }}
                className="bg-green-200 p-6 rounded-lg shadow-lg relative z-0"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
