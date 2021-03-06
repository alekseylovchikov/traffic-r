import React from 'react';
import { Link } from 'react-router';
import SvgIcon from '../../../../common/SvgIcon';

export default class TableItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr>
        <td><Link className="site-link" to="/publisher/sites/10/update">{'brabdev.com'}</Link> <span className="active-page--content--table--zones">{'12 zones'} <span className="btn-icon"><SvgIcon imageID="svgicon__filters--shape" className="filters--shape" /></span></span></td>
        <td>{'2,748,522'}</td>
        <td>{'33,665'}</td>
        <td>{'$0.090'}</td>
        <td>{'$0.30'}</td>
        <td>{'$7,115.77'}</td>
      </tr>
    );
  }
}
