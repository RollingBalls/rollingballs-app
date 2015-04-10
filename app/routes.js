import React from "react/addons";
import { Route } from "react-router";

import App from "./components/app";
import Intro from "./components/intro";

export default ([
  <Route name="intro" path="/"      handler={Intro} />,
  <Route name="app" handler={App}>
  </Route>
]);
