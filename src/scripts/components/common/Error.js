import React      from 'react';
import classnames from 'classnames';

class Error extends React.Component {

  static displayName = 'Error!';

  static propTypes = {
    type: React.PropTypes.string.isRequired,
    active: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ]),
    text: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ])
  };

  static defaultProps = {
    active: false,
    text: 'Error!'
  };

  constructor(props) {
    super(props);
  }

  render() {

    const typeClassNamePart = this.props.type + '__error';

    const errorClassName = classnames('error', { 'error--active': this.props.active }, typeClassNamePart);

    return (
      <div className={errorClassName}>{this.props.text}</div>
    )
  }
}

export default Error;
