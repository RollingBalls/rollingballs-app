import React from "react/addons";
import { Route } from "react-router";

import App from "./components/app";
import Intro from "./components/intro";
import Choose from "./components/choose";

export default ([
  <Route name="app" handler={App}>
    <Route name="intro"   path="/"       handler={Intro} />
    <Route name="choose"  path="/choose" handler={Choose} />
  </Route>
]);
