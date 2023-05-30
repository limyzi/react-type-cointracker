import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import Header from "./Header";

function Router(){
  return (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Header/>
    <Switch>
      <Route path="/:coinId">
        <Coin/>
      </Route>
      <Route path="/">
        <Coins/>
      </Route>
    </Switch>
  </BrowserRouter>
  )
}

export default Router;