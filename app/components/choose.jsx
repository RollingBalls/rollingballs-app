import React from "react/addons";
import { Link } from "react-router";

import geolocation from '../sources/geolocation';

var Choose = React.createClass({
  getInitialState() {
    return {
      puzzles: []
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
      });
    });
  },

  render() {
    return (
      <form ref="difficulty" className="choose wrap" onSubmit={this.handleSubmit}>
        <h1 className="choose__title">Choose how hard it will be!</h1>

        <div className="choose__actions">
          <button type="submit" className="button choose__easy">Easy</button>
          <button type="submit" className="button choose__medium">Medium</button>
          <button type="submit" className="button choose__hard">Hard</button>
        </div>
      </form>
    );
  }
});

export default Choose;
