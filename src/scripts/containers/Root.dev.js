import React from 'react';

import DevTools from './DevTools';

class App extends React.Component {

  static displayName = 'UserDataReminder';

  static propTypes = {
    children: React.PropTypes.element
  };

  constructor(props) {
    super(props);
  }

  render() {

    const { children } = this.props;

    return (
      <div id="root">
        {children}
        <DevTools />
      </div>
    );
  }

}

export default App;
