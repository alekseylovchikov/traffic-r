import React, { Component, PropTypes } from 'react';

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    icon: PropTypes.object,
    title: PropTypes.string
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { className, icon, title } = this.props;
    return (
      <button className={className}><span className="btn-icon">{icon ? icon : null}</span>{title}</button>
    );
  }
}
