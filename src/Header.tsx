import * as React from 'react';

interface HeaderProps {
  title: string;
}

class Header extends React.Component<HeaderProps> {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}

export default Header;
