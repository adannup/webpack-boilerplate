import React, { Component } from 'react';
import Header from './Header';

class App extends Component<any, any> {
  render() {
    return (
      <div>
        <Header title="Webpack Configuration" />
        <p>Webpack + ReactJS + TypeScript</p>
      </div>
    );
  }
}

export default App;
