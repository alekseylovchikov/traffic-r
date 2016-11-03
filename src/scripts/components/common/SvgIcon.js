import React, { Component } from 'react';

class SvgIcon extends Component {

  static displayName = 'Svg icon';

  static propTypes = {
    className : React.PropTypes.string.isRequired,
    imageID   : React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {

    const { className, imageID } = this.props;

    if (className !== nextProps.className || imageID !== nextProps.imageID) {
      return true;
    }

    return false;
  }

  render() {

    const { imageID, className } = this.props;

    const iconClassName = 'icon ' + className;
    const iconUrl       = '/img/icons.svg#' + imageID;

    return (
      <svg className={iconClassName}>
        <use xlinkHref={iconUrl}></use>
      </svg>
    )
  }
}

export default SvgIcon;
