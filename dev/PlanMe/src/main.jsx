import React from "react";
import ReactDOM from "react-dom/client";
import Login from "./Components/Login/Login";
import Register from "./Components/register/Register";
import Menubar from "./Components/Menubar/Menubar";
import Page from "./Components/Pages/page";
import "./index.css";
import Dashboard from "./Components/dashboard/dashboard";


const App = () => {
  const [page, setPage] = React.useState("login");

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div id="main">
     <Dashboard />
  
      {/* {page === "login" && <Login onPageChange={handlePageChange} />} */}
      {/* {page === "register" && <Register onPageChange={handlePageChange} />} */}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

