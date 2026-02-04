import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

// API Endpoint: https://urban-fiesta-x95664gxq99fpqxv-8000.app.github.dev/api/workouts/
function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = API_ENDPOINTS.workouts;
    console.log('Workouts - Fetching from:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        console.log('Workouts - Processed data:', workoutsData);
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts - Error fetching data:', error);
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
        <p className="mt-3">Loading workouts...</p>
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

  const getDifficultyBadge = (difficulty) => {
    const diff = (difficulty || '').toLowerCase();
    if (diff === 'easy' || diff === 'beginner') return 'bg-success';
    if (diff === 'medium' || diff === 'intermediate') return 'bg-warning';
    if (diff === 'hard' || diff === 'advanced') return 'bg-danger';
    return 'bg-secondary';
  };

  return (
    <div className="container mt-4">
      <h1 className="page-header">Workout Recommendations</h1>
      <div className="page-container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Personalized Workouts</h2>
          <span className="badge bg-primary">{workouts.length} Workouts</span>
        </div>
        <div className="row">
          {workouts.length > 0 ? (
            workouts.map((workout, index) => (
              <div key={workout.id || index} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5 className="card-title mb-0">
                        <i className="bi bi-lightning-charge-fill me-2"></i>
                        {workout.name || workout.title || 'Workout'}
                      </h5>
                      <span className={`badge ${getDifficultyBadge(workout.difficulty || workout.level)}`}>
                        {workout.difficulty || workout.level || 'N/A'}
                      </span>
                    </div>
                    <p className="card-text text-muted">{workout.description || 'No description available'}</p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-tag-fill me-2"></i>Type</span>
                      <span className="badge bg-info rounded-pill">{workout.workout_type || workout.type || 'N/A'}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-clock-fill me-2"></i>Duration</span>
                      <span className="badge bg-primary rounded-pill">{workout.duration || workout.duration_minutes || 'N/A'} min</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-fire me-2"></i>Calories</span>
                      <span className="badge bg-danger rounded-pill">{workout.calories || workout.estimated_calories || 'N/A'}</span>
                    </li>
                  </ul>
                  <div className="card-body">
                    <button className="btn btn-success btn-sm w-100">
                      <i className="bi bi-play-circle me-2"></i>Start Workout
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="text-center text-muted py-5">
                <i className="bi bi-inbox" style={{fontSize: '3rem'}}></i>
                <p className="mt-3">No workouts found</p>
                <button className="btn btn-primary mt-2">
                  <i className="bi bi-plus-circle me-2"></i>Add New Workout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
