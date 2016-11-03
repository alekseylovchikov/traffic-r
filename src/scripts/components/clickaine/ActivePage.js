import React, { Component } from 'react';

import SvgIcon from '../common/SvgIcon';
import Button from '../common/Button';

export const activePages = [
  'Advertiser_1',
  'Advertiser_2',
  'Advertiser_3',
  'Advertiser_4',
  'Advertiser_5',
  'Dashboard',
  'Sites',
  'Statistics',
  'Profile',
  'Finance',
  'Support',
  'API'
];

export default class ActivePage extends Component {
  static propTypes = {
    activeState: React.PropTypes.oneOf(activePages)
  };
  constructor(props) {
    super(props);
    this.state = {
      activeState: this.props.activeState
    };
  }
  render() {
    const { activeState } = this.props;
    return (
      <div>
        <div className="active-page--container">
          <h1 className="active-page--title">{'Empty page'}</h1>
        </div>
      </div>
    );
  }
}
