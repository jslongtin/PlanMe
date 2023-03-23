import React from "react";
import ReactDOM from "react-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/register/Register";
import Menubar from "./Components/Menubar/Menubar";
import Page from "./Components/Pages/Page";
import "./index.css";

const App = () => {
  const [page, setPage] = React.useState("login");

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      {/* <Page/>  */}
     
      {page === "login" && <Login onPageChange={handlePageChange} />}
      {page === "register" && <Register onPageChange={handlePageChange} />}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
