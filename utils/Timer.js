import React, {Component,PropTypes} from 'react';

import Podium from "./helpers";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: props.steps
    };
  }
  componentDidMount() {
    const steps = this.state.steps;
    steps.forEach((time) => {
      window.setTimeout(() => {
        Podium.keydown(39);
      }, time);
    });
  }
  render() {
    return (<div></div>);
  }
}

Timer.PropTypes = {
  steps: PropTypes.array.isRequired
};

export default Timer;