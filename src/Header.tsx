import React, { Component } from 'react';

interface HeaderProps {
  title: string;
}

class Header extends Component<HeaderProps> {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}

export default Header;
