import React from 'react';

class Timer extends React.Component {

  static displayName = 'Timer';

  static propTypes = {
    className : React.PropTypes.string,
    from      : React.PropTypes.number,
    duration  : React.PropTypes.number
  };

  constructor(props) {
    super(props);

    this.timer = setInterval(this.tick, 1000);
  }

  state = {
    now       : this.props.from,
    deadline  : Date.now() + this.props.duration,
    countdown : null
  };


  componentWillMount() {
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick = () => {

    const { now, deadline } = this.state;

    let countdown;

    if (now <= deadline) {
      countdown = deadline - now;

      this.setState({
        now       : now + 1000,
        countdown : countdown
      });
    } else {

      // Stop the countdown
      clearInterval(this.timer);
    }
  };

  render() {
    let { className }   = this.props;
    const { countdown } = this.state;

    const countdownFormatted = new Date(countdown).toUTCString().substr(17, 8);

    if ('00:00:00' < countdownFormatted && countdownFormatted <= '00:01:00') {
      className = className + ' ' + className + '--soon';
    }

    return (
      <div className={className}>{countdownFormatted}</div>
    )
  }
}

export default Timer;
