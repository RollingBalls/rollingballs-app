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

var Win = React.createClass({
  mixins: [IntlMixin, Navigation],

  render() {
    return (
      <section className="game wrap">
        <div className="box--border-only">
          <h1 className="timer__title">YOU WIN!</h1>
        </div>

        <div className="win__points box--green">
          <span>Right, it is the </span>
          {this.props.poi}
        </div>

        <div className="win__actions">
          <a href="#" className="button--blue">
            View awards
          </a>

          <Link to="puzzles" className="button--secondary">
            Another puzzle
          </Link>
        </div>
      </section>
    );
  }
});

export default Win;
