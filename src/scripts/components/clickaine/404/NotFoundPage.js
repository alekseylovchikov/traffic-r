import React from 'react';

export default class NotFoundPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // add routes publisher
    // add routes advertiser
    return (
      <div className="active-page--container">
        <h1 className="active-page--title">{'Sorry, page not found...'}</h1>
      </div>
    );
  }
}
