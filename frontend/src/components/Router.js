import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import DocumentTitle from "react-document-title";

import HomePage from "./HomePage/index.js";
import SignupPage from "./SignupPage/index.js";
import FeedPage from "./FeedPage/index";
import ImageModal from "./ImageModal/index";

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

        <Route exact path="/feed">
          <DocumentTitle title="Laberest">
            <FeedPage />
          </DocumentTitle>
        </Route>

        <Route exact path="/image/:imageId">
          <DocumentTitle title="Laberest">
            <ImageModal />
          </DocumentTitle>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
