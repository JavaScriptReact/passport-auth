import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./containers/Dashboard";
import Authentication from "./containers/Authentication";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/authentication">
          <Authentication />
        </Route>
        <Route path="*">
          <h1>404 : Not Found</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
