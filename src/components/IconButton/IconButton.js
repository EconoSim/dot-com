import React from 'react';
import PropTypes from 'prop-types';
import './IconButton.css';

const IconButton = ({ icon: Icon, href, size = 30 }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="icon-button"
    style={{ '--icon-size': `${size}px` }}
  >
    <Icon className="icon" />
  </a>
);

IconButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  href: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

export default IconButton;