import React from "react/addons";
import { Link } from "react-router";
import {
  IntlMixin,
  FormattedMessage,
  FormattedNumber
} from "react-intl";

import geolocation from '../sources/geolocation';
import storage from '../sources/storage';
import api from '../sources/api';

var Game = React.createClass({
  mixins: [IntlMixin],

  getInitialState() {
    var puzzle = storage.puzzle();
    console.log(puzzle);
    this.startGame(puzzle.id);
    return {
      seconds: undefined,
      puzzle: puzzle
    };
  },

  startGame(puzzleId) {
    api.startPuzzle(puzzleId).then((res) => {
      console.log('res', res);
      this.setState({seconds: res});
    });
  },

  puzzle() {
    return (
      <section className="puzzle wrap">
        <div className="box--border">
          <h1 className="choose__title">
            Puzzle n. {this.state.puzzle.index+1}
          </h1>
          {this.state.puzzle.text}
        </div>
      </section>
    );
  },

  render() {
    var html = this.puzzle();
    return (html);
  }
});

export default Game;
