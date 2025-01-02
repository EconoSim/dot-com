import React from 'react';
import PropTypes from 'prop-types';
import './DevLog.css';

const DevLog = ({ project, repository, branch, user, message, date }) => (
    <div className="dev-log">
        <div className="middle-row">
            <p className="message">{message}</p>
        </div>
        <div className="bottom-row">
            <p className="user">{user} - {date}</p>
        </div>
    </div>
);

DevLog.propTypes = {
    project: PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
    branch: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

export default DevLog;