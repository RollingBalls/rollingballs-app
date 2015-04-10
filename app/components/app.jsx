import React from "react/addons";
import { RouteHandler } from 'react-router';
import { IntlMixin } from "react-intl";

import OffCanvasMenu from "./shared/off_canvas_menu";

var App = React.createClass({
  mixins: [IntlMixin],

  openOffCanvasMenu(e) {
    e.preventDefault();
    this.refs.menu.toggle();
  },

  render() {
    return (
      <div>
        <OffCanvasMenu ref="menu" />
        <RouteHandler openOffCanvasMenu={this.openOffCanvasMenu} />
      </div>
    )
  }
});

export default App;
