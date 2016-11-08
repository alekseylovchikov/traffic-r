import React, { Component } from 'react';
import { Link } from 'react-router';

import SvgIcon from '../common/SvgIcon';

export default class Navbar extends Component {
  static propTypes = {
    switchToggleMenu: React.PropTypes.func.isRequired,
    amount: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['advertiser', 'publisher']).isRequired
  };
  constructor(props) {
    super(props);

    const { type: stateFromClickaine } = this.props;

    this.state = {
      type: stateFromClickaine
    };
  }
  componentWillReceiveProps(nextProps) {
    const { type: currentType } = this.props;
    const { type: nextType } = nextProps;
    if (currentType !== nextType) {
      this.setState({
        type: nextType
      });
    }
  }
  switchToggleMenu(active) {
    const { type: currentState } = this.state;
    if (currentState === 'advertiser' && active !== 'advertiser') {
      this.props.switchToggleMenu(active);
      this.setState({
        type: 'publisher'
      });
    } else if (currentState === 'publisher' && active !== 'publisher') {
      this.props.switchToggleMenu(active);
      this.setState({
        type: 'advertiser'
      });
    } else {
      return;
    }
  }
  render() {
    const { type } = this.state;
    const { amount } = this.props;
    return (
      <div className="navbar">
        <span className="logo">
          <Link to="/" id="logo-image"><SvgIcon imageID="svgicon__logo" className="icon--logo" /></Link>
          <Link to="/" id="logo-text"><SvgIcon imageID="svgicon__logo--text" className="icon--logo-text" /></Link>
        </span>
        <nav className="navbar--switch-menu">
          <ul>
            <li><Link to="/publisher" activeClassName="navbar-active" onClick={this.switchToggleMenu.bind(this, 'publisher')}>{'Publisher'}</Link></li>
            <li><Link to="/advertiser" activeClassName="navbar-active" onClick={this.switchToggleMenu.bind(this, 'advertiser')}>{'Advertiser'}</Link></li>
          </ul>
        </nav>
        <span className="navbar-right">
          <a href="#" id="navbar-amount">{amount}</a>
          <a href="#" id="logout">
            <SvgIcon imageID="svgicon__logout" className="icon--logout" />
          </a>
        </span>
      </div>
    );
  }
};
