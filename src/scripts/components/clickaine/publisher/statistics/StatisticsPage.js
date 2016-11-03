import React, { Component } from 'react';
import { Link } from 'react-router';
// components
import Button from '../../../common/Button';
import TableItem from './item/TableItem';
import SubTableItem from './item/SubTableItem';
// icons
import SvgIcon from '../../../common/SvgIcon';
// random displays
function getRandomAmount() {
  const randomNum = Math.floor((Math.random() * 19999999) + 10000000).toString();
  let result = '';
  // check arguments
  if (arguments.length !== 0) {
    if (arguments[0] === 'amount') {
      // if arguments equals amount
      result += '$' + randomNum.charAt(0) + ',';
    } else {
      // if arguments is not amount
      result += randomNum.charAt(0) + ',';
    }
  } else {
    // if no arguments
    result += randomNum.charAt(0) + ',';
  }
  // add ,
  for (var i = 1; i < randomNum.length; i++) {
    if (i % 4 === 0) {
      result += ',';
    } else {
      result += randomNum.charAt(i)
    }
  }
  return result;
}
// fake data
const optionariumSites = [
  {
    id: 1,
    name: 'Leaderbord 728x90',
    displays: getRandomAmount(),
    hits: '105,645',
    cpm: '$0.051',
    cpc: '$0.31',
    earnings: getRandomAmount('amount')
  },
  {
    id: 2,
    name: 'Vertical Skyscraper 300x600',
    displays: getRandomAmount(),
    hits: '105,645',
    cpm: '$0.051',
    cpc: '$0.31',
    earnings: getRandomAmount('amount')
  },
  {
    id: 3,
    name: 'Mobile Instant Msg',
    displays: getRandomAmount(),
    hits: '105,645',
    cpm: '$0.051',
    cpc: '$0.31',
    earnings: getRandomAmount('amount')
  },
  {
    id: 4,
    name: 'Direct LinkBanner',
    displays: getRandomAmount(),
    hits: '105,645',
    cpm: '$0.051',
    cpc: '$0.31',
    earnings: getRandomAmount('amount')
  },
  {
    id: 5,
    name: 'Banner Ad 100x60',
    displays: getRandomAmount(),
    hits: '105,645',
    cpm: '$0.051',
    cpc: '$0.31',
    earnings: getRandomAmount('amount')
  },
  {
    id: 6,
    name: 'Mobile Instant Msg 2',
    displays: getRandomAmount(),
    hits: '105,645',
    cpm: '$0.051',
    cpc: '$0.31',
    earnings: getRandomAmount('amount')
  }
];

export default class StatisticsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'optionarium': {
        showInfo: false
      }
    };
  }
  toggleInfo(site) {
    const currentState = this.state[site].showInfo;
    const newObject = Object.assign({}, this.state[site], { showInfo: !currentState });
    const updObj = { [site] : newObject };
    this.setState(updObj);
  }
  render() {
    const { optionarium } = this.state;
    function renderShape() {
      if (!optionarium.showInfo) {
        return <SvgIcon imageID="svgicon__filters--shape" className="filters--shape" />;
      } else {
        return <SvgIcon imageID="svgicon__shape--up" className="filters--shape" />;
      }
    }
    return (
      <div className="active-page--container">
        <header className="active-page--header">
          <h1 className="active-page--title">{'statistics'}</h1>
          <Button
            className="btn filter"
            title="by site"
            icon={<SvgIcon imageID="svgicon__filters--shape" className="filters--shape" />}
          />
          <a className="active-page--header--filter" href="#">{'Last week: 21 October, 2016 - 28 October, 2016'}</a>
          <Link to="/publisher/sites/create"><Button className="btn add" title="add site" /></Link>
        </header>
        <section className="active-page--filters">
          <Button
            className="btn filters"
            title="23 zones"
            icon={<SvgIcon imageID="svgicon__filters--shape" className="filters--shape" />}
          />
          <Button
            className="btn filters"
            title="Safari 10.0"
            icon={<SvgIcon imageID="svgicon__filters--shape" className="filters--shape" />}
          />
          <Button
            className="btn filters"
            title="8 providers"
            icon={<SvgIcon imageID="svgicon__filters--shape" className="filters--shape" />}
          />
          <Button
            className="btn filters"
            title="5 locations"
            icon={<SvgIcon imageID="svgicon__filters--shape" className="filters--shape" />}
          />
          <Button
            className="btn filters"
            title="Add filter"
            icon={<SvgIcon imageID="svgicon__filters--shape" className="filters--shape" />}
          />
        </section>
        <section className="active-page--content">
          <table className="active-page--content--table">
            <thead>
              <tr>
                <th>{'Site'} <span className="filter"><SvgIcon imageID="svgicon__table--filter" className="icon--filter" /></span></th>
                <th>{'Displays'} <span className="filter"><SvgIcon imageID="svgicon__table--filter" className="icon--filter" /></span></th>
                <th>{'Hits'} <span className="filter"><SvgIcon imageID="svgicon__table--filter" className="icon--filter" /></span></th>
                <th>{'CPM'} <span className="filter"><SvgIcon imageID="svgicon__table--filter" className="icon--filter" /></span></th>
                <th>{'CPC'} <span className="filter"><SvgIcon imageID="svgicon__table--filter" className="icon--filter" /></span></th>
                <th>{'Earnings'} <span className="filter"><SvgIcon imageID="svgicon__table--filter" className="icon--filter" /></span></th>
              </tr>
            </thead>
            <tbody>
              <TableItem />
              <tr>
                <td><Link>{'optionarium.com'}</Link> <span onClick={this.toggleInfo.bind(this, 'optionarium')} className="active-page--content--table--zones">{'6 sites'} <span className="btn-icon">{renderShape()}</span></span></td>
                <td>{'1,292,732'}</td>
                <td>{'105,645'}</td>
                <td>{'$0.051'}</td>
                <td>{'$0.31'}</td>
                <td>{'$6,133.15'}</td>
              </tr>
              { optionarium.showInfo ? optionariumSites.map(el => {
                return <SubTableItem key={el.id} {...el} />;
              }) : null }
              <tr>
                <td><Link>{'xxxxxtrafff.com'}</Link> <span className="active-page--content--table--zones">{'8 zones'} <span className="btn-icon"><SvgIcon imageID="svgicon__filters--shape" className="filters--shape" /></span></span></td>
                <td>{'1,292,732'}</td>
                <td>{'105,645'}</td>
                <td>{'$0.051'}</td>
                <td>{'$0.31'}</td>
                <td>{'$6,133.15'}</td>
              </tr>
              <tr className="disable-table-item">
                <td><Link>{'optionarium.com'}</Link> <span className="table-icon"><SvgIcon imageID="svgicon__table--notification" className="" /></span></td>
                <td>{'1,292,732'}</td>
                <td>{'105,645'}</td>
                <td>{'$0.051'}</td>
                <td>{'$0.31'}</td>
                <td>{'$6,133.15'}</td>
              </tr>
              <tr className="disable-table-item">
                <td><Link>{'supermegatraffic.com'}</Link> <span className="table-icon"><SvgIcon imageID="svgicon__table--check" className="" /></span></td>
                <td>{'1,292,732'}</td>
                <td>{'105,645'}</td>
                <td>{'$0.051'}</td>
                <td>{'$0.31'}</td>
                <td>{'$6,133.15'}</td>
              </tr>
              <tr className="total-table-item">
                <td>{'Totals'}</td>
                <td>{'18,161,289'}</td>
                <td>{'500,157'}</td>
                <td>{'$0.087'}</td>
                <td>{'$0.49'}</td>
                <td>{'$125,586.55'}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}
