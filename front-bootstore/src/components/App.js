import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import ShirtsPage from "./Shirts/ShirtsPage";
import PantsPage from "./Pants/PantsPage";
import ShirtDetails from "./Shirts/ShirtDetails";
import PantsDetails from "./Pants/PantsDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Homepage></Homepage>
        </Route>
        <Route path="/shirts" exact>
          <ShirtsPage></ShirtsPage>
        </Route>
        <Route path="/shirts/:id" exact>
          <ShirtDetails></ShirtDetails>
        </Route>
        <Route path="/pants" exact>
          <PantsPage></PantsPage>
        </Route>
        <Route path="/pants/:id" exact>
          <PantsDetails></PantsDetails>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}