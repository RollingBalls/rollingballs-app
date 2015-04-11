import React from "react/addons";
import { RouteHandler, State } from 'react-router';
import { IntlMixin } from "react-intl";

import OffCanvasMenu from "./shared/off_canvas_menu";

var App = React.createClass({
  mixins: [IntlMixin, State],

  faded() {
    return (
      !this.isActive('intro') &&
      !this.isActive('win')
    );
  },

  render() {
    var classes = React.addons.classSet({
      'app': true,
      'faded': this.faded()
    });

    return (
      <div className={classes}>
        <RouteHandler openOffCanvasMenu={this.openOffCanvasMenu} />
      </div>
    )
  }
});

export default App;
