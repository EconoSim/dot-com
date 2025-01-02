import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './DevLogBranch.css';
import DevLog from '../DevLog/DevLog';

const DevLogBranch = ({ project, repository, branch }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [commits, setCommits] = useState([]);
    const [page, setPage] = useState(1);
    const commitsPerPage = 3;

    const fetchCommits = async (pageNumber) => {
        setLoading(true);
        try {
            const commitsResponse = await fetch(
                `https://api.github.com/repos/${project}/${repository}/commits?sha=${branch}&per_page=${commitsPerPage}&page=${pageNumber}`
            );
            if (!commitsResponse.ok) throw new Error(`Failed to fetch commits for branch ${branch}`);
            const commitsData = await commitsResponse.json();
            if (pageNumber === 1) {
                setCommits(commitsData);
            } else {
                setCommits(prev => [...prev, ...commitsData]);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (e) => {
        e.stopPropagation();
        if (!isExpanded) {
            fetchCommits(1);
        }
        setIsExpanded(!isExpanded);
    };

    const handleLoadMore = (e) => {
        e.stopPropagation();
        setPage(prev => prev + 1);
        fetchCommits(page + 1);
    };

    return (
        <div className="dev-log-branch" onClick={handleClick}>
            <div className="branch-header">
                <p className="branch">{branch}</p>
            </div>
            {isExpanded && (
                <div className="devlog-container">
                    {error && <div>Error: {error}</div>}
                    {commits.map((commit) => (
                        <DevLog
                            key={commit.sha}
                            project={project}
                            repository={repository}
                            branch={branch}
                            user={commit.commit.author.name}
                            message={commit.commit.message}
                            date={new Date(commit.commit.author.date).toLocaleDateString()}
                        />
                    ))}
                    {commits.length > 0 && (
                        <button
                            className="load-more-button"
                            onClick={handleLoadMore}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'load more commits'}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

DevLogBranch.propTypes = {
    project: PropTypes.string.isRequired,
    repository: PropTypes.string.isRequired,
    branch: PropTypes.string.isRequired,
};

export default DevLogBranch;