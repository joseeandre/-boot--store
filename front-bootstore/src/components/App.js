import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}