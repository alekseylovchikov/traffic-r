import React from 'react';

import SvgIcon from './SvgIcon';

class Loading extends React.Component {

  static displayName = 'Loading...';

  static propTypes = {
    type   : React.PropTypes.string.isRequired,
    text   : React.PropTypes.string,
    logo   : React.PropTypes.bool,
    name   : React.PropTypes.bool,
    active : React.PropTypes.bool
  };

  static defaultProps = {
    text   : 'Loading...',
    logo   : false,
    name   : false,
    active : false
  };

  constructor(props) {
    super(props);
  }

  render() {

    const { type, active, text, logo, name } = this.props;

    const activeClassNamePart = (active) ? ' loading--active' : '';
    const typeClassNamePart   = ' ' + type + '__loading';
    const className = 'loading' + activeClassNamePart + typeClassNamePart;

    const logoIcon  = (logo) ? <SvgIcon imageID="svgicon__logo" className="icon--logo icon--logo-big icon--loading" /> : null;
    const nameIcon  = (name) ? <SvgIcon imageID="svgicon__name" className="icon--name icon--loading" /> : null;

    const animation = (logo) ? <span className="loading__animation"></span> : null;

    const content = (logo || name) ? (
      <div className={className}>
        {logoIcon}
        {nameIcon}
        {animation}
      </div>
    ) : (
      <div className={className}>{text}</div>
    );

    return (
      <div className={className}>
        <h1>{content}</h1>
      </div>
    )
  }
}

export default Loading;
