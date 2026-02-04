import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = API_ENDPOINTS.leaderboard;
    console.log('Leaderboard - Fetching from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        console.log('Leaderboard - Processed data:', leaderboardData);
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Leaderboard - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading leaderboard...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <i className="bi bi-exclamation-triangle-fill text-danger" style={{fontSize: '3rem'}}></i>
        <p className="error-message mt-3">Error: {error}</p>
      </div>
    );
  }

  const getRankBadge = (rank) => {
    if (rank === 1) return <span className="badge badge-rank badge-rank-1">🥇 #{rank}</span>;
    if (rank === 2) return <span className="badge badge-rank badge-rank-2">🥈 #{rank}</span>;
    if (rank === 3) return <span className="badge badge-rank badge-rank-3">🥉 #{rank}</span>;
    return <span className="badge bg-secondary badge-rank">#{rank}</span>;
  };

  return (
    <div className="container mt-4">
      <h1 className="page-header">Competition Leaderboard</h1>
      <div className="page-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Top Performers</h2>
          <span className="badge bg-success">{leaderboard.length} Competitors</span>
        </div>
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th><i className="bi bi-trophy-fill me-2"></i>Rank</th>
                  <th><i className="bi bi-person-fill me-2"></i>User</th>
                  <th><i className="bi bi-people-fill me-2"></i>Team</th>
                  <th><i className="bi bi-star-fill me-2"></i>Total Points</th>
                  <th><i className="bi bi-list-check me-2"></i>Activities</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry, index) => (
                    <tr key={entry.id || index} className={index < 3 ? 'table-light' : ''}>
                      <td>{getRankBadge(index + 1)}</td>
                      <td className="fw-semibold">{entry.user_name || entry.user || 'N/A'}</td>
                      <td>
                        <span className="badge bg-info">{entry.team_name || entry.team || 'N/A'}</span>
                      </td>
                      <td>
                        <strong className="text-success">{entry.total_points || entry.points || 0}</strong> pts
                      </td>
                      <td>{entry.activity_count || entry.activities || 0}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      <i className="bi bi-inbox" style={{fontSize: '2rem'}}></i>
                      <p className="mt-2">No leaderboard data found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
