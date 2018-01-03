import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { ProgressBar } from '@blueprintjs/core';
export default class ExportGridTimer extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    count: PropTypes.number.isRequired,
    expectedLoadTime: PropTypes.number.isRequired
  };
  state = {
    seconds: 0
  };

  componentWillMount() {
    this.startTimer();
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = nextProps;
    const { loading: prevLoading } = this.props;
    if (!loading) {
      this.stopTimer();
    } else if (!prevLoading) {
      console.log('Start Timer...');
      if (!this.timer) {
        this.startTimer();
      }
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    if (this.props.loading) {
      this.setState({ seconds: 0 });
      this.timer = setInterval(() => {
        const seconds = this.state.seconds + 1;
        this.setState({ seconds });
      }, 1000);
    }
  };

  stopTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  };
  render() {
    const { loading, count, expectedLoadTime } = this.props;
    const { seconds } = this.state;
    const value = seconds / expectedLoadTime;
    return (
      <div className="timer">
        {loading
          ? `Loading... ${seconds} second(s)`
          : `Loaded ${count} rows in ${seconds} second(s)`}{' '}
        {/* {loading && <ProgressBar intent={Intent.SUCCESS} value={value} />} */}
      </div>
    );
  }
}
