import React, { Component } from 'react';
import { Link } from 'react-router';

export default class SidebarItem extends Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.object,
    notification: React.PropTypes.number,
    switchToCurrentPage: React.PropTypes.func,
    activeClass: React.PropTypes.bool,
    type: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  switchToPage(title) {
    this.props.switchToCurrentPage(title);
  }

  render() {
    const { title, icon, notification, activeClass, type } = this.props;
    return (
      <Link
        to={`/${type}/${title.toLowerCase()}`}
        activeClassName="active"
        className="sidebar-item"
        onClick={this.switchToPage.bind(this, title)}
      >
        <div>
          <span className="sidebar-item--icon">{icon}</span> <span className="item--heading">{title}</span> {notification ? <span className="item--notification">{notification}</span> : null}
        </div>
      </Link>
    );
  }
}
