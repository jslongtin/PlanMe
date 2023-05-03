import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/register/Register";
import Navbar from "./Components/Navbar/navbar";
import Page from "./Components/Pages/page";
import Dashboard from "./Components/dashboard/dashboard";
import "./index.css";
import PageProfile from "./Components/ProfilePage/pageProfile";

const App = () => {
  const [page, setPage] = React.useState(
    sessionStorage.getItem("page") || "login"
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  React.useEffect(() => {
    sessionStorage.setItem("page", page);
  }, [page]);

  return (
    <div id="main">
      <PageProfile/>
      {/* <Dashboard /> */}

   
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
