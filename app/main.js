require("babel/polyfill");

import intlData from "./utils/intl";
import React from "react/addons";
import Router from "react-router";
import routes from "./routes";
import "./utils/jquery";

var currentLang = 'en';
var router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});

if (process.env.NODE_ENV !== 'test') {
  router.run((Handler, state) => {
    React.render(
      <Handler {...state.params} {...intlData[currentLang]} />,
      document.getElementById('app')
    );
  });
}

if (process.env.NODE_ENV === 'development') {
  window.React = React; // For React Developer Tools
  window.api = require("./sources/api");
}
