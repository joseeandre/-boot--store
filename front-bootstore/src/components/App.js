import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Homepage></Homepage>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}