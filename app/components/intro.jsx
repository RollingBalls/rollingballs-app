import React from "react/addons";
import { IntlMixin, FormattedMessage } from "react-intl";
import { Link } from "react-router";

var Intro = React.createClass({
  mixins: [IntlMixin],

  render() {
    return (
      <div>
        <h1>
          Rolling Balls
        </h1>
      </div>
    );
  }
});

export default Intro;
