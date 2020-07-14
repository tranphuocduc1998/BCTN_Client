import React, { Component, com } from 'react';

import MainScreen from './screens/Main';
import SplashScreen from './screens/Splash';

export default class App extends Component {
  state = {
    splash: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ splash: false });
    }, 5000);
  }

  render() {
    return (
      this.state.splash ? <SplashScreen /> : <MainScreen />
    );
  }
}