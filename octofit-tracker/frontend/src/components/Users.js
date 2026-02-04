import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

// API Endpoint: https://urban-fiesta-x95664gxq99fpqxv-8000.app.github.dev/api/users/
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = API_ENDPOINTS.users;
    console.log('Users - Fetching from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        console.log('Users - Processed data:', usersData);
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Users - Error fetching data:', error);
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
        <p className="mt-3">Loading users...</p>
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
      <h1 className="page-header">User Directory</h1>
      <div className="page-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">All Users</h2>
          <span className="badge bg-primary">{users.length} Users</span>
        </div>
        <div className="row">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div key={user.id || index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                           style={{width: '50px', height: '50px', fontSize: '1.5rem'}}>
                        <i className="bi bi-person-fill"></i>
                      </div>
                      <div className="ms-3">
                        <h5 className="card-title mb-0">{user.username || user.name || 'Unknown User'}</h5>
                        <small className="text-muted">
                          <i className="bi bi-envelope me-1"></i>
                          {user.email || 'N/A'}
                        </small>
                      </div>
                    </div>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-people-fill me-2"></i>Team</span>
                      <span className="badge bg-info rounded-pill">{user.team_name || user.team || 'No team'}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-star-fill me-2"></i>Points</span>
                      <span className="badge bg-success rounded-pill">{user.total_points || user.points || 0}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-activity me-2"></i>Activities</span>
                      <span className="badge bg-warning rounded-pill">{user.activity_count || user.activities || 0}</span>
                    </li>
                    <li className="list-group-item">
                      <i className="bi bi-calendar-check me-2"></i>
                      <small className="text-muted">
                        Joined: {user.date_joined ? new Date(user.date_joined).toLocaleDateString() : 'N/A'}
                      </small>
                    </li>
                  </ul>
                  <div className="card-body">
                    <button className="btn btn-outline-primary btn-sm w-100">
                      <i className="bi bi-person-lines-fill me-2"></i>View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center text-muted py-5">
                <i className="bi bi-inbox" style={{fontSize: '3rem'}}></i>
                <p className="mt-3">No users found</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
