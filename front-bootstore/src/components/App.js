import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
<<<<<<< HEAD
import ShirtsPage from "./Shirts/ShirtsPage";
import PantsPage from "./Pants/PantsPage";
import ShirtDetails from "./Shirts/ShirtDetails";
import PantsDetails from "./Pants/PantsDetails";
=======
import Login from './Register/Login';
import GlobalStyle from "../styles/GlobalStyle";
import SignUp from "./Register/SignUp";
>>>>>>> LoginAndSignUp

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Switch>
        <Route path="/" exact>
          <Homepage></Homepage>
        </Route>
<<<<<<< HEAD
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
=======
        <Route path="/register" exact component={Login} />
        <Route path="/sign-up" exact component={SignUp} />
>>>>>>> LoginAndSignUp
      </Switch>
    </BrowserRouter>
  );
}