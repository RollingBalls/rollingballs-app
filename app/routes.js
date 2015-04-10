import React from "react/addons";
import { Route } from "react-router";

import App from "./components/app";
import Intro from "./components/intro";
import Choose from "./components/choose";
import Game from "./components/game";

export default ([
  <Route name="app" handler={App}>
    <Route name="intro"   path="/"            handler={Intro} />
    <Route name="choose"  path="/puzzles"     handler={Choose} />
    <Route name="game"    path="/game"        handler={Game} />
  </Route>
]);
