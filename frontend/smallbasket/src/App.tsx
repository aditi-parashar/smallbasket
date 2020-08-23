import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/homePage/HomePage";
import PageNotFound from "./components/pageNotFound/PageNotFound";

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <>
              <Navbar />
              <HomePage />
            </>
          )}
        />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
