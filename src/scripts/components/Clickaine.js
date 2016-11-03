import React, { Component } from 'react';

// components
import Navbar from './clickaine/Navbar';
import Sidebar from './clickaine/Sidebar';
import ActivePage from './clickaine/ActivePage';

import Loading from './common/Loading';

export default class Clickaine extends Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      type: 'publisher',
      isLoading: true,
      activePage: 'Dashboard'
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 1000);
  }

  handleSwitchToggleMenu() {
    const { type: currentState } = this.state;
    if (currentState === 'advertiser') {
      this.setState({
        type: 'publisher'
      });
    } else {
      this.setState({
        type: 'advertiser'
      });
    }
  }

  handleSwitchToCurrentPage(title) {
    this.setState({
      activePage: title
    });
  }

  render() {
    const { activePage } = this.state;
    const renderApp = () => {
      if (this.state.isLoading) {
        return <Loading type='some-class' />;
      } else {
        return (
          <div>
            <Navbar switchToggleMenu={this.handleSwitchToggleMenu.bind(this)} amount="$1,500.35" type={this.state.type} />
            <Sidebar {...this.state} activeState={activePage} switchToCurrentPage={this.handleSwitchToCurrentPage.bind(this)} />
            <div className="active-page">
              {React.cloneElement(this.props.children, { activeState: activePage })}
            </div>
          </div>
        );
      }
    };

    return renderApp();
  }
}
