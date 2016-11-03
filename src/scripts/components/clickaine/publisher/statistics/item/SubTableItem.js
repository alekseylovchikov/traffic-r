import React from 'react';

export default class SubTableItem extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
    displays: React.PropTypes.string,
    hits: React.PropTypes.string,
    cpm: React.PropTypes.string,
    cpc: React.PropTypes.string,
    earnings: React.PropTypes.string
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { name, hits, earnings, displays, cpm, cpc } = this.props;
    return (
      <tr className="sub-table-item">
        <td><span>{name}</span></td>
        <td><span>{displays}</span></td>
        <td><span>{hits}</span></td>
        <td><span>{cpm}</span></td>
        <td><span>{cpc}</span></td>
        <td><span>{earnings}</span></td>
      </tr>
    );
  }
}
