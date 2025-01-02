import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DevLogContainer.css';
import DevLogBranch from '../DevLogBranch/DevLogBranch';

const DevLogContainer = ({ project, repository }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [branches, setBranches] = useState([]);


    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const branchesResponse = await fetch(
                    `https://api.github.com/repos/${project}/${repository}/branches`
                );
                if (!branchesResponse.ok) throw new Error(`Failed to fetch branches for ${repository}`);
                const branchesData = await branchesResponse.json();

                setBranches(branchesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBranches();
    }, []);

    if (loading) return <div className="loading-container">Loading...</div>; if (error) return <div>Error: {error}</div>;


    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="dev-log-container" onClick={handleClick}>
            <div className="top-row">
                <p className="project">{project} - {repository}</p>
                <p className="repository"></p>
            </div>
            {isExpanded && (
                <div className="branches-container">
                    {branches.map(branch => (
                        <DevLogBranch
                            key={branch.name}
                            project={project}
                            repository={repository}
                            branch={branch.name}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

DevLogContainer.propTypes = {
    project: PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
};

export default DevLogContainer;