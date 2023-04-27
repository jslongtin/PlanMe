import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Components/Login/Login";
import Register from "./Components/register/Register";
import Navbar from "./Components/Navbar/navbar";
import Page from "./Components/Pages/page";
import "./index.css";
import Dashboard from "./Components/dashboard/dashboard";

const App = () => {
  const [page, setPage] = React.useState(sessionStorage.getItem("page") ||"login");

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  
  React.useEffect(() => {
    sessionStorage.setItem("page", page);
  }, [page]);
  return (
    <div id="main">
      {/* <Dashboard /> */}
      {page === "login" && <Login onPageChange={handlePageChange} />}
      {page === "register" && <Register onPageChange={handlePageChange} />}
      {page === "dashboard" && <Dashboard onPageChange={handlePageChange} />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
