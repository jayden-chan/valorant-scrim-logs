import React from "react";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Players from "./components/pages/Players";

export default function App() {
  return (
    <Router basename="valorant-scrim-logs">
      <Switch>
        <Route path="/players">
          <Players />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
