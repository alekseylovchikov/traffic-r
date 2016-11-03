import React from 'react';

class Modal extends React.Component {

  static displayName = 'Modal';

  static propTypes = {
    children: React.PropTypes.node
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="blur">
        <div className="modal animated animated--fast zoomIn">{this.props.children}</div>
      </div>
    );
  }

}

export default Modal;

