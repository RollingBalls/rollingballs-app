import React from "react/addons";
import { Route } from "react-router";

import App from "./components/app";
import Intro from "./components/intro";
import Puzzles from "./components/puzzles";
import Game from "./components/game";
import Win from "./components/win";
import Lose from "./components/lose";

export default ([
  <Route name="app" handler={App}>
    <Route name="intro"   path="/"            handler={Intro} />
    <Route name="puzzles" path="/puzzles"     handler={Puzzles} />
    <Route name="game"    path="/game"        handler={Game} />
    <Route name="win"     path="/win"         handler={Win} />
    <Route name="lose"    path="/lose"        handler={Lose} />
  </Route>
]);
