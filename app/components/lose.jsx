import React from "react/addons";
import { Link, Navigation } from "react-router";
import {
  IntlMixin,
  FormattedMessage,
  FormattedNumber,
  FormattedTime
} from "react-intl";

import storage from '../sources/storage';
import api from '../sources/api';

var Lose = React.createClass({
  mixins: [IntlMixin, Navigation],

  answer() {
    if (this.props.poi) {
      return (
        <div className="win__points box--boder-only">
          <span>Sorry, it's the </span>
          {this.props.poi}
        </div>
      );
    }
  },

  render() {
    return (
      <section className="game wrap">
        <div className="box--border-only">
          <h1 className="timer__title">Uhm... NOPE.</h1>
        </div>

        {this.answer()}

        <div className="win__actions">
          <a href="#" className="button--blue">
            Let it go...
          </a>

          <Link to="puzzles" className="button--secondary">
            Try again
          </Link>
        </div>
      </section>
    );
  }
});

export default Lose;
