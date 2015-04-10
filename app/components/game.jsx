import React from "react/addons";
import { Link } from "react-router";
import {
  IntlMixin,
  FormattedMessage,
  FormattedNumber,
  FormattedTime
} from "react-intl";

import geolocation from '../sources/geolocation';
import storage from '../sources/storage';
import api from '../sources/api';
import pad from '../utils/pad';

var Game = React.createClass({
  mixins: [IntlMixin],

  getInitialState() {
    var puzzle = storage.puzzle();
    return {
      timeout: 0,
      interval: undefined,
      elapsed: 0,
      puzzle: puzzle
    };
  },

  componentDidMount() {
    var puzzle = storage.puzzle();
    this.startGame(puzzle.id);
  },

  startGame(puzzleId) {
    api.startPuzzle(puzzleId).then((res) => {
      console.log(res.body.seconds)
      this.setState({timeout: res.body.seconds});

      var interval = setInterval(() => {
        var elapsed = this.state.elapsed + 1;
        if (elapsed > this.state.timeout) {
          alert('TIMEOUT!');
          if (this.state.interval) {
            clearInterval(this.state.interval);
            this.setState({
              timeout: 0,
              elapsed: 0,
              interval: 0,
            });
          }
        }
        else {
          this.setState({
            elapsed: elapsed,
            interval: interval
          })
        }
      }, 1000);
    });
  },

  countdown() {
    var countdown = new Date((this.state.timeout - this.state.elapsed) * 1000);
    return (
      <div>
        <h3 className="timer__title">Time left</h3>
        <div className="timer">
          <span className="timer__number">{pad(countdown.getMinutes())}</span>
          <span className="timer__diveder"> : </span>
          <span className="timer__number">{pad(countdown.getSeconds())}</span>
        </div>
      </div>
    );
  },

  puzzle() {
    return (
      <section className="game wrap">
        {this.countdown()}

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
