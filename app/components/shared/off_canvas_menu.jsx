import React from "react/addons";
import { IntlMixin, FormattedMessage } from "react-intl";
import { Link, Navigation } from "react-router";

const SWIPE_THRESHOLD = 20;
const MENU_WIDTH = 280;

var OffCanvasMenu = React.createClass({
  mixins: [IntlMixin, Navigation],

  getInitialState() {
    return {
      open: false,
      touchStart: false
    };
  },

  componentDidMount() {
    this.refs.menu.getDOMNode().addEventListener('click', this.hideOrNope);
    document.body.addEventListener('click', this.hide);
    document.body.addEventListener("touchstart", this.handleStart);
    document.body.addEventListener("touchmove", this.handleMove);
    document.body.addEventListener("touchend", this.handleEnd);
  },

  componentWillUnmount() {
    this.refs.menu.getDOMNode().removeEventListener('click', this.hideOrNope);
    document.body.removeEventListener('click', this.hide);
    document.body.removeEventListener("touchstart", this.handleStart);
    document.body.removeEventListener("touchmove", this.handleMove);
    document.body.removeEventListener("touchend", this.handleEnd);
  },

  translateMenu(px) {
    jQuery(this.refs.menu.getDOMNode()).css({
      transform: "translateX(" + px + "px)"
    });
  },

  handleStart(e) {
    var touch = e.changedTouches[0];
    if (touch &&
         (!this.state.open && touch.pageX < SWIPE_THRESHOLD ||
          this.state.open)) {
      if (!this.state.open) {
        this.translateMenu(touch.pageX);
      }
      this.setState({touched: true});
      // don't use setState because they're async
      this.touch = {
        startX: touch.pageX,
        lastX: touch.pageX,
        movingForward: true
      };
    }
  },

  handleMove(e) {
    var touch = e.changedTouches[0];
    if (touch && this.touch) {
      e.preventDefault();
      var move;
      if (this.state.open) {
        move = Math.min((MENU_WIDTH - (this.touch.startX - touch.pageX)), MENU_WIDTH);
      }
      else {
        move = Math.min(touch.pageX, MENU_WIDTH);
      }
      this.translateMenu(move);
      // moving forward == opening
      this.touch.movingForward = (touch.pageX >= this.touch.lastX);
      this.touch.lastX = touch.pageX;
    }
  },

  handleEnd(e) {
    var touch = e.changedTouches[0];
    if (touch && this.touch) {
      this.setState({
        open: this.touch.movingForward,
        touched: false
      });
      var finalPosition = this.touch.movingForward ? MENU_WIDTH : 0
      this.translateMenu(finalPosition);
      this.touch = undefined;
    }
  },

  toggle() {
    var move = this.state.open ? 0 : MENU_WIDTH;
    this.translateMenu(move);
    this.setState({open: !this.state.open})
  },

  hide() {
    this.translateMenu(0);
    this.setState({open: false});
  },

  hideOrNope(e) {
    if (jQuery(e.target).closest('.off-canvas-menu__link').length) {
      this.hide();
    }
    else {
      e.stopPropagation();
    }
  },

  render() {
    var classes = React.addons.classSet({
      'is-touched': this.state.touched,
      'is-open': this.state.open,
      'off-canvas-menu': true,
    });

    return (
      <aside className={classes} ref="menu">
        <h3 className="off-canvas-menu__name">
          <FormattedMessage message={this.getIntlMessage('appName')}/>
        </h3>

        <nav>
          <a href="#events" className="off-canvas-menu__link">
            <i className="icon--place icon--huge"/>
            <FormattedMessage message={this.getIntlMessage('events.title')}/>
          </a>

          <a href="#asd" className="off-canvas-menu__link">
            <i className="icon--reserved icon--huge"/>
            <FormattedMessage message={this.getIntlMessage('reservations.title')}/>
          </a>

          <a href="#" className="off-canvas-menu__link">
            <i className="icon--privacy icon--huge"/>
            <FormattedMessage message={this.getIntlMessage('privacy.title')}/>
          </a>
        </nav>
      </aside>
    );
  }
});

export default OffCanvasMenu;
