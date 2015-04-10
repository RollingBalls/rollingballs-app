import React from "react/addons";
import { Link } from "react-router";

var Intro = React.createClass({
  getInitialState() {
    return {
      loaded: false
    };
  },

  componentDidMount() {
    var spritesSrc = "/assets/images/sprites-2x.png"
    var img = new window.Image();
    img.onload = () => this.setState({loaded: true});
    img.src = spritesSrc;
  },

  render() {
    var classes = React.addons.classSet({
      'intro': true,
      'ready': this.state.loaded
    });

    return (
      <div className={classes}>
        <h1 className="logo intro__logo">
          <span className="sprite--artquest logo__block"/>
          <br/>
          <span className="sprite--hatlogo logo__block"/>
        </h1>
        <div className="intro__actions">
          <Link to="choose" className="button--primary button--huge">
            Begin
          </Link>
          <button className="button--secondary button--huge">Awards</button>
        </div>
      </div>
    );
  }
});

export default Intro;
