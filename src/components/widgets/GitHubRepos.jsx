import React, { useState, useEffect } from 'react';
import { Star, GitBranch, Terminal } from 'lucide-react';

const Github = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0c-2.7-1.8-3.9-1.4-3.9-1.4a5.5 5.5 0 0 0-.1 3.8 5.5 5.5 0 0 0-1.5 3.8c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    <path d="M9 20c-5 1.5-5-2.5-7-3"></path>
  </svg>
);

const GitHubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/users/GayazuddinSK/repos?sort=updated&per_page=4');
        if (!response.ok) throw new Error('Failed to fetch repositories');
        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="glass-panel p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Github className="w-6 h-6 text-arc" />
          <h2 className="tech-heading text-xl">ACTIVE DEPLOYMENTS</h2>
        </div>
        <span className="text-xs font-tech text-textMuted uppercase">Module: GitHub_API</span>
      </div>

      <div className="flex-grow flex flex-col space-y-4 overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full space-y-3 text-arc">
            <Terminal className="w-8 h-8 animate-pulse" />
            <span className="font-tech text-xs tracking-widest uppercase">Fetching Git Data...</span>
          </div>
        ) : error ? (
          <div className="text-stark-red font-tech text-sm text-center">
            Error: {error}
          </div>
        ) : repos.length === 0 ? (
          <div className="text-textMuted font-tech text-sm text-center">
            No public repositories found.
          </div>
        ) : (
          repos.map(repo => (
            <a 
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-surface/30 border border-surfaceBorder hover:border-arc/50 hover:bg-arc/5 rounded p-4 transition-all group block"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-tech text-textMain tracking-wider group-hover:text-arc transition-colors">
                  {repo.name}
                </h3>
                <div className="flex space-x-3 text-xs font-tech text-textMuted">
                  <span className="flex items-center"><Star className="w-3 h-3 mr-1"/> {repo.stargazers_count}</span>
                  <span className="flex items-center"><GitBranch className="w-3 h-3 mr-1"/> {repo.forks_count}</span>
                </div>
              </div>
              {repo.description ? (
                <p className="text-xs text-textMuted line-clamp-2">{repo.description}</p>
              ) : (
                <p className="text-xs text-textMuted italic">No description provided.</p>
              )}
              <div className="mt-3 flex items-center space-x-2">
                {repo.language && (
                  <span className="text-[10px] font-tech px-2 py-0.5 rounded border border-surfaceBorder text-arc">
                    {repo.language}
                  </span>
                )}
                <span className="text-[10px] font-tech text-textMuted uppercase">
                  Updated: {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default GitHubRepos;
