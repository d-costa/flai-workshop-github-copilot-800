import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = API_ENDPOINTS.teams;
    console.log('Teams - Fetching from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Teams - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const teamsData = data.results || data;
        console.log('Teams - Processed data:', teamsData);
        setTeams(Array.isArray(teamsData) ? teamsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Teams - Error fetching data:', error);
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
        <p className="mt-3">Loading teams...</p>
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

  return (
    <div className="container mt-4">
      <h1 className="page-header">Team Management</h1>
      <div className="page-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">All Teams</h2>
          <span className="badge bg-primary">{teams.length} Teams</span>
        </div>
        <div className="row">
          {teams.length > 0 ? (
            teams.map((team, index) => (
              <div key={team.id || index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">
                      <i className="bi bi-people-fill me-2"></i>
                      {team.name || 'Unknown Team'}
                    </h5>
                    <p className="card-text text-muted">{team.description || 'No description available'}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-person-fill me-2"></i>Members</span>
                      <span className="badge bg-info rounded-pill">{team.member_count || team.members?.length || 0}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-star-fill me-2"></i>Total Points</span>
                      <span className="badge bg-success rounded-pill">{team.total_points || 0}</span>
                    </li>
                    <li className="list-group-item">
                      <i className="bi bi-calendar-plus me-2"></i>
                      <small className="text-muted">
                        Created: {team.created_at ? new Date(team.created_at).toLocaleDateString() : 'N/A'}
                      </small>
                    </li>
                  </ul>
                  <div className="card-body">
                    <button className="btn btn-primary btn-sm w-100">
                      <i className="bi bi-eye me-2"></i>View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center text-muted py-5">
                <i className="bi bi-inbox" style={{fontSize: '3rem'}}></i>
                <p className="mt-3">No teams found</p>
                <button className="btn btn-primary mt-2">
                  <i className="bi bi-plus-circle me-2"></i>Create New Team
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
