import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/register/Register";
import Navbar from "./Components/Navbar/navbar";
import Dashboard from "./Components/dashboard/dashboard";
import "./index.css";
import Utilisateur from "./Components/Utilisateur/utilisateur";
import Graph from "./Components/Contacts/Graph";
import Budget from "./Components/modules/budget/Budget";

const App = () => {
  return (
    <div id="main">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/profile" component={Utilisateur} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/graph" component={Graph} />
      </Switch>
    </div>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
