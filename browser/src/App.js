import React, { Component } from "react";
import { Route, Switch,Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}
