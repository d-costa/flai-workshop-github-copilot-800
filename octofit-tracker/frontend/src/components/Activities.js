import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = API_ENDPOINTS.activities;
    console.log('Activities - Fetching from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        console.log('Activities - Processed data:', activitiesData);
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Activities - Error fetching data:', error);
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
        <p className="mt-3">Loading activities...</p>
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
      <h1 className="page-header">Activity Tracker</h1>
      <div className="page-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Recent Activities</h2>
          <span className="badge bg-primary">{activities.length} Activities</span>
        </div>
        <div className="table-container">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th><i className="bi bi-person-fill me-2"></i>User</th>
                  <th><i className="bi bi-activity me-2"></i>Activity Type</th>
                  <th><i className="bi bi-clock me-2"></i>Duration (min)</th>
                  <th><i className="bi bi-speedometer me-2"></i>Distance (km)</th>
                  <th><i className="bi bi-fire me-2"></i>Calories</th>
                  <th><i className="bi bi-calendar-event me-2"></i>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length > 0 ? (
                  activities.map((activity, index) => (
                    <tr key={activity.id || index}>
                      <td className="fw-semibold">{activity.user_name || activity.user || 'N/A'}</td>
                      <td>
                        <span className="badge bg-info">{activity.activity_type || 'N/A'}</span>
                      </td>
                      <td>{activity.duration || 'N/A'}</td>
                      <td>{activity.distance || 'N/A'}</td>
                      <td><strong>{activity.calories_burned || 'N/A'}</strong></td>
                      <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      <i className="bi bi-inbox" style={{fontSize: '2rem'}}></i>
                      <p className="mt-2">No activities found</p>
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

export default Activities;
