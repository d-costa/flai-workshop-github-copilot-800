import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container mt-4">
      <div className="home-container">
        <div className="text-center">
          <h1 className="home-title display-3">
            <i className="bi bi-heart-pulse-fill me-3"></i>
            Welcome to OctoFit Tracker!
          </h1>
          <p className="home-lead mb-4">
            Track your fitness activities, compete with teams, and reach your goals.
          </p>
          <hr className="my-4" />
          <div className="row mt-5">
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-activity text-primary" style={{fontSize: '3rem'}}></i>
                  <h5 className="card-title mt-3">Track Activities</h5>
                  <p className="card-text text-muted">Log your workouts and monitor your progress</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-trophy text-warning" style={{fontSize: '3rem'}}></i>
                  <h5 className="card-title mt-3">Compete & Win</h5>
                  <p className="card-text text-muted">Join teams and climb the leaderboard</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-body text-center">
                  <i className="bi bi-lightning-charge text-success" style={{fontSize: '3rem'}}></i>
                  <h5 className="card-title mt-3">Get Personalized</h5>
                  <p className="card-text text-muted">Receive customized workout recommendations</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-muted">Use the navigation menu above to explore different sections of the app.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
