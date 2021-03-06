import React from "react/addons";
import { Navigation, Link } from "react-router";
import {
  IntlMixin,
  FormattedMessage,
  FormattedNumber
} from "react-intl";

import geolocation from '../sources/geolocation';
import storage from '../sources/storage';
import api from '../sources/api';

var Puzzles = React.createClass({
  mixins: [IntlMixin, Navigation],

  getInitialState() {
    return {
      step: 'choose',
      puzzles: [],
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    this.setState({step: 'loading'});
    var defaultDistance = 2 * 1000;
    geolocation.getPosition((lat, lon) => {
      api.getPuzzles({
        lat: lat,
        lon: lon,
        distance: defaultDistance
      }).then((res) => {
        this.setState({
          step: 'puzzlesList',
          puzzles: res.body,
        })
      });
    });
  },

  selectDifficulty(d, e) {
    e.preventDefault();
    this.setState({difficulty: d});
  },

  chooseForm() {
    var classes = React.addons.classSet({
      'difficulty__slider': true,
      'easy': (this.state.difficulty == 'easy'),
      'medium': (this.state.difficulty == 'medium'),
      'hard': (this.state.difficulty == 'hard'),
    });

    return (
      <form ref="difficulty" className="choose wrap" onSubmit={this.handleSubmit}>
        <div className="box">
          <h1 className="choose__title">Choose how hard it will be!</h1>
        </div>

        <div className="choose__actions">
          <a onClick={this.selectDifficulty.bind(this, 'easy')}
             className="button--small choose__easy">
            Easy
          </a>
          <a onClick={this.selectDifficulty.bind(this, 'medium')}
             className="button--small choose__medium">
            Medium
          </a>
          <a onClick={this.selectDifficulty.bind(this, 'hard')}
             className="button--small choose__hard">
            Hard
          </a>
        </div>

        <div className="difficulty__wrapper">
          <div className={classes}>
            <div className="difficulty__slide">
              <span className="sprite--easy"/>
            </div>
            <div className="difficulty__slide">
              <span className="sprite--medium"/>
            </div>
            <div className="difficulty__slide">
              <span className="sprite--hard"/>
            </div>
          </div>
        </div>

        <button type="submit" className="button--huge button--primary">
          Start!
        </button>
        <br/>
      </form>
    );
  },

  selectPuzzle(index, e) {
    e.preventDefault();
    storage.setPuzzle({
      index: index,
      text: this.state.puzzles[index].text,
      id: this.state.puzzles[index].id,
    });
    this.replaceWith('game');
  },

  puzzlesList() {
    var list = this.state.puzzles.map((puzzle, i) => {
      return(
        <a href="#" key={`puzzle-${puzzle.id}`}
                 className="puzzle-item"
                 onClick={this.selectPuzzle.bind(undefined, i)}>
          <span className="sprite--starcircle"/>
          <span className="puzzle-item__number">{i+1}?</span>
        </a>
      )
    });
    // FIXME : {this.getIntlMessage('puzzles.found')}
    return (
      <section className="puzzles wrap">
        <div className="box">
          <h1 className="choose__title">
            <FormattedMessage message="{count, plural, =0 {0 puzzles} =1 {1 puzzle} other {# puzzles}} found!"
                              count={this.state.puzzles.length}/>
          </h1>
          <h2 className="choose__subtitle">
            Choose one and start countdown!
          </h2>
        </div>
        {list}
      </section>
    );
  },

  loading() {
    return (
      <section className="puzzles wrap">
        <div className="box">
          <h1 className="choose__title">
            Searching for puzzles...
          </h1>
        </div>
      </section>
    );
  },

  render() {
    if (this.state.step === 'choose') {
      var html = this.chooseForm();
    }
    else if (this.state.step === 'puzzlesList') {
      var html = this.puzzlesList();
    }
    else if (this.state.step === 'loading') {
      var html = this.loading();
    }

    return (html);
  }
});

export default Puzzles;
