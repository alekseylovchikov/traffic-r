import React from 'react';

export default class Publisher extends React.Component {
  static propTypes = {
    children: React.PropTypes.object
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
