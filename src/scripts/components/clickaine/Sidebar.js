import React, { Component } from 'react';

// generate id
import shortId from 'shortid';

// components
import SidebarItem from './sidebar/SidebarItem';
import SvgIcon from '../common/SvgIcon';

// active pages state
import { activePages } from './ActivePage';

// fake data
const AdvertisersSidebarItems = [
  {
    id: shortId.generate(),
    icon: <SvgIcon imageID="svgicon__dashboard" className="icon--dashboard" />,
    title: 'Advertiser_1'
  },
  {
    id: shortId.generate(),
    icon: <SvgIcon imageID="svg__dashboard--sites" className="" />,
    title: 'Advertiser_2'
  },
  {
    id: shortId.generate(),
    icon: <SvgIcon imageID="svg__dashboard--profile" className="icon--profile" />,
    title: 'Advertiser_3'
  },
  {
    id: shortId.generate(),
    icon: <SvgIcon imageID="svg__dashboard--finance" className="" />,
    title: 'Advertiser_4'
  },
  {
    id: shortId.generate(),
    icon: <SvgIcon imageID="svg__dashboard--support" className="icon--support" />,
    title: 'Advertiser_5'
  }
];
const PublishersSidebarItems = [
  {
    id: shortId.generate(),
    icon: <SvgIcon imageID="svgicon__dashboard" className="icon--dashboard" />,
    title: 'Dashboard'
  },
  {
    id: shortId.generate(),
    icon: <SvgIcon imageID="svg__dashboard--sites" className="" />,
    title: 'Sites'
  },
  {
    id: shortId.generate(),
    icon: <SvgIcon imageID="svgicon__dashboard--statistics" className="icon--statistics" />,
    title: 'Statistics'
  },
  {
    id: shortId.generate(),
    icon: <SvgIcon imageID="svg__dashboard--profile" className="icon--profile" />,
    title: 'Profile',
    notification: 3
  },
  {
    id: shortId.generate(),
    icon: <SvgIcon imageID="svg__dashboard--finance" className="" />,
    title: 'Finance'
  },
  {
    id: shortId.generate(),
    icon: <SvgIcon imageID="svg__dashboard--support" className="icon--support" />,
    title: 'Support'
  },
  {
    id: shortId.generate(),
    icon: <SvgIcon imageID="svg__dashboard--api" className="" />,
    title: 'API'
  }
];

export default class Sidebar extends Component {
  static propTypes = {
    type: React.PropTypes.oneOf(['advertiser', 'publisher']).isRequired,
    activeState: React.PropTypes.oneOf(activePages).isRequired,
    switchToCurrentPage: React.PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      activePage: this.props.activeState
    };
  }

  componentWillReceiveProps(nextProps) {
    const { activeState: nextState } = nextProps;
    const { activeState: prevState } = this.props;
    if (prevState !== nextState) {
      this.setState({
        activePage: nextState
      });
    }
    if (this.props.type !== nextProps.type) {
      this.setState({
        type: nextProps.type
      });
    }
  }

  handleSwitchPage(title) {
    this.props.switchToCurrentPage(title);
  }

  render() {
    const { type, activePage } = this.state;
    const renderOneOfType = () => {
      if (type === 'publisher') {
        return PublishersSidebarItems.map(item => {
          return <SidebarItem activeClass={item.title === activePage ? true : false} type={type} switchToCurrentPage={this.handleSwitchPage.bind(this)} title={item.title} key={item.id} icon={item.icon ? item.icon : null} notification={item.notification ? item.notification : null} />;
        });
      } else if (type === 'advertiser') {
        return AdvertisersSidebarItems.map(item => {
          return <SidebarItem activeClass={item.title === activePage ? true : false} type={type} switchToCurrentPage={this.handleSwitchPage.bind(this)} title={item.title} key={item.id} icon={item.icon ? item.icon : null} notification={item.notification ? item.notification : null} />;
        });
      } else {
        return null;
      }
    };

    return (
      <div className="sidebar">
        {renderOneOfType()}
      </div>
    );
  }
}
