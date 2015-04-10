import React from "react/addons";
import { RouteHandler, State } from 'react-router';

import OffCanvasMenu from "./shared/off_canvas_menu";

var App = React.createClass({
  mixins: [State],

  render() {
    var classes = React.addons.classSet({
      'app': true,
      'faded': !this.isActive('intro')
    });

    return (
      <div className={classes}>
        <RouteHandler openOffCanvasMenu={this.openOffCanvasMenu} />
      </div>
    )
  }
});

export default App;
