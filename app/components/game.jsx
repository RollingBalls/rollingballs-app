import React from "react/addons";
import { Link, Navigation } from "react-router";
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
  mixins: [IntlMixin, Navigation],

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
      this.setState({timeout: res.body.seconds});
      // this.setState({timeout: 5});

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

  foundButton() {
    return (
      <div className="game__actions">
        <button onClick={this.submitAnswer}
                className="button--primary button--huge">
          Found it!
        </button>
      </div>
    );
  },

  submitAnswer(e) {
    e.preventDefault();
    if (this.state.interval) clearInterval(this.state.interval);
    geolocation.getPosition((lat, lon) => {
      api.finishPuzzle(lat, lon).then((res) => {
        if (res.body.win) {
          this.replaceWith('win');
        }
        else {
          this.replaceWith('lose');
        }
      });
    });
  },

  render() {
    return (
      <section className="game wrap">
        {this.countdown()}
        {this.foundButton()}

        <div className="box--border">
          <h1 className="choose__title">
            Puzzle n. {this.state.puzzle.index+1}
          </h1>
          {this.state.puzzle.text}
        </div>
      </section>
    );
  }
});

export default Game;
