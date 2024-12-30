import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavButton.css';

const NavButton = ({ url, children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = () => {
        navigate(url, { replace: true });
    };

    const isActive = location.pathname === url;

    return (
        <button
            onClick={handleClick}
            className={`nav-button ${isActive ? 'active' : ''}`}
        >
            {children}
        </button>
    );
};

NavButton.propTypes = {
    url: PropTypes.string.isRequired,
    children: PropTypes.node,
};

export default NavButton;