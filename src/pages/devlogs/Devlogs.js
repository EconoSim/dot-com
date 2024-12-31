import React, { useState, useEffect } from 'react';
import './Devlogs.css';
import DevLog from '../../components/DevLog/DevLog';

function Devlogs() {
    const [commits, setCommits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // List of repositories to fetch commits from
    const repositories = [
        { owner: 'econosim', repo: 'econosim.org' },
        { owner: 'econosim', repo: 'unity-frontend' },
        { owner: 'econosim', repo: 'simulation-backend' },
        { owner: 'econosim', repo: 'github-self-hosted-runner-tests' }
    ];

    const token = process.env.REACT_APP_GITHUB_TOKEN;

    useEffect(() => {
        if (!token) {
            setError("GitHub token is not set in environment variables.");
            setLoading(false);
            return;
        }

        const fetchCommits = async () => {
            try {
                const allCommits = [];

                for (const { owner, repo } of repositories) {
                    console.log(`Fetching branches for ${owner}/${repo}`);

                    // Fetch branches for the repository
                    const branchesResponse = await fetch(
                        `https://api.github.com/repos/${owner}/${repo}/branches`,
                        {
                            headers: {
                                Authorization: `token ${token}`,
                                Accept: 'application/vnd.github.v3+json',
                            },
                        }
                    );

                    if (!branchesResponse.ok) {
                        throw new Error(`Failed to fetch branches for ${repo}: ${branchesResponse.statusText}`);
                    }

                    const branchesData = await branchesResponse.json();
                    console.log(`Fetched branches for ${repo}:`, branchesData);

                    // Fetch the latest commit for each branch
                    const commitPromises = branchesData.map(async (branch) => {
                        const commitsResponse = await fetch(
                            `https://api.github.com/repos/${owner}/${repo}/commits?sha=${branch.name}&per_page=1`,
                            {
                                headers: {
                                    Authorization: `token ${token}`,
                                    Accept: 'application/vnd.github.v3+json',
                                },
                            }
                        );
                        if (!commitsResponse.ok) throw new Error(`Failed to fetch commits for branch ${branch.name} in ${repo}: ${commitsResponse.statusText}`);
                        const commitsData = await commitsResponse.json();
                        return { ...commitsData[0], repo };
                    });

                    const latestCommits = await Promise.all(commitPromises);
                    allCommits.push(...latestCommits);
                }

                setCommits(allCommits);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCommits();
    }, [token]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="devlogs">
            {commits.map((commit) => (
                <DevLog
                    key={commit.sha}
                    project="Econosim"
                    repository={commit.repo}
                    user={commit.commit.author.name}
                    message={commit.commit.message}
                    date={new Date(commit.commit.author.date).toLocaleDateString()}
                />
            ))}
        </div>
    );
}

export default Devlogs;