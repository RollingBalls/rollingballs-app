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

var Choose = React.createClass({
  mixins: [IntlMixin, Navigation],

  getInitialState() {
    return {
      step: 'choose',
      puzzles: [],
    };
  },

  handleSubmit(e) {
    e.preventDefault();
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

  chooseForm() {
    return (
      <form ref="difficulty" className="choose wrap" onSubmit={this.handleSubmit}>
        <div className="box">
          <h1 className="choose__title">Choose how hard it will be!</h1>
        </div>

        <div className="choose__actions">
          <button type="submit" className="button choose__easy">Easy</button>
          <button type="submit" className="button choose__medium">Medium</button>
          <button type="submit" className="button choose__hard">Hard</button>
        </div>
      </form>
    );
  },

  selectPuzzle(index) {
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
        <article key={`puzzle-${puzzle.id}`}
                 className="puzzle-item"
                 onClick={this.selectPuzzle.bind(null, i)}>
          <span className="sprite--starcircle"/>
          <span className="puzzle-item__number">{i+1}?</span>
        </article>
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

  render() {
    if (this.state.step === 'choose') {
      var html = this.chooseForm();
    }
    else if (this.state.step === 'puzzlesList' ) {
      var html = this.puzzlesList();
    }

    return (html);
  }
});

export default Choose;
