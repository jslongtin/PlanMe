import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./Components/Login/Login";
import Register from "./Components/register/Register";
import Navbar from "./Components/Navbar/navbar";
import Page from "./Components/Pages/page";
import Dashboard from "./Components/dashboard/dashboard";
import "./index.css";
import Utilisateur from "./Components/Utilisateur/utilisateur";


const App = () => {

  return (
    <div id="main">
       
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/profile" component={Utilisateur} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    

    </div>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
