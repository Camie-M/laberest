import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import DocumentTitle from "react-document-title";

import HomePage from "./HomePage/index.js";
import SignupPage from "./SignupPage/index.js";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <DocumentTitle title="Home">
            <HomePage />
          </DocumentTitle>
        </Route>

        <Route exact path="/signup">
          <DocumentTitle title="Cadastro">
            <SignupPage />
          </DocumentTitle>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
