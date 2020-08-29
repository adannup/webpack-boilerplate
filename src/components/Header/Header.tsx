import React from 'react';
import PropTypes from 'prop-types';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => <h1>{title}</h1>;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
