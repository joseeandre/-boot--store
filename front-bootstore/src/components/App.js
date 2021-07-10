import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Login from './Register/Login';
import GlobalStyle from "../styles/GlobalStyle";
import SignUp from "./Register/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle/>
      <Switch>
        <Route path="/" exact>
          <Homepage></Homepage>
        </Route>
        <Route path="/register" exact component={Login} />
        <Route path="/sign-up" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}