# OctoFit Tracker - Codespace Setup and API Testing Guide

## Overview
This guide explains how to start the Django backend server using VS Code's launch configuration and test the REST API endpoints.

## Environment Configuration

### Current Setup
- **Codespace Name**: `${CODESPACE_NAME}` (auto-detected)
- **Backend URL**: `https://${CODESPACE_NAME}-8000.app.github.dev`
- **Local URL**: `http://localhost:8000`

### Django Configuration
The following files have been configured for Codespace:

1. **settings.py** - `ALLOWED_HOSTS` includes:
   - `localhost`
   - `127.0.0.1`
   - `0.0.0.0`
   - `${CODESPACE_NAME}-8000.app.github.dev` (dynamically set)
   - `.app.github.dev` (wildcard for GitHub Codespaces)

2. **urls.py** - Automatically detects environment and returns appropriate base URLs:
   - Uses `$CODESPACE_NAME` environment variable when available
   - Falls back to `http://localhost:8000` for local development

## Starting the Server

### Option 1: Using VS Code Launch Configuration (Recommended)
1. Open the **Run and Debug** panel (Ctrl+Shift+D or Cmd+Shift+D)
2. Select **"Launch Django Backend"** from the dropdown
3. Click the green play button or press F5
4. The server will start on `0.0.0.0:8000`

### Option 2: Using Terminal
```bash
cd /workspaces/flai-workshop-github-copilot-800/octofit-tracker/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

## REST API Endpoints

All endpoints follow the format: `https://${CODESPACE_NAME}-8000.app.github.dev/api/[component]/`

### Available Endpoints:
- **API Root**: `/api/` - Lists all available endpoints
- **Users**: `/api/users/` - User management
- **Teams**: `/api/teams/` - Team management
- **Activities**: `/api/activities/` - Activity tracking
- **Leaderboard**: `/api/leaderboard/` - Competitive rankings
- **Workouts**: `/api/workouts/` - Workout suggestions

## Testing the API

### Automated Testing Script
We've created a test script that automatically tests all endpoints:

```bash
cd /workspaces/flai-workshop-github-copilot-800/octofit-tracker/backend
./test_api.sh
```

This script:
- Automatically detects if you're in Codespace or local environment
- Tests all API endpoints
- Displays formatted JSON responses
- Shows HTTP status codes with color-coded results

### Manual Testing with curl

#### Test API Root
```bash
curl https://${CODESPACE_NAME}-8000.app.github.dev/api/
```

#### Test Users Endpoint
```bash
curl https://${CODESPACE_NAME}-8000.app.github.dev/api/users/
```

#### Test Teams Endpoint
```bash
curl https://${CODESPACE_NAME}-8000.app.github.dev/api/teams/
```

#### Test Activities Endpoint
```bash
curl https://${CODESPACE_NAME}-8000.app.github.dev/api/activities/
```

#### Test Leaderboard Endpoint
```bash
curl https://${CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
```

#### Test Workouts Endpoint
```bash
curl https://${CODESPACE_NAME}-8000.app.github.dev/api/workouts/
```

### Testing from Local Machine
If testing locally (not in Codespace):
```bash
curl http://localhost:8000/api/
curl http://localhost:8000/api/users/
curl http://localhost:8000/api/activities/
# ... etc
```

## Verifying the Setup

### 1. Check MongoDB is Running
```bash
ps aux | grep mongod | grep -v grep
```
Expected: Should show mongod process running

### 2. Check Server is Running
```bash
lsof -i :8000
```
Expected: Should show Python process on port 8000

### 3. Get Current Codespace Name
```bash
echo $CODESPACE_NAME
```

### 4. Test API Root
```bash
curl https://${CODESPACE_NAME}-8000.app.github.dev/api/
```
Expected: JSON response with all endpoint URLs

## Troubleshooting

### HTTPS Certificate Issues
The configuration uses the environment variable `$CODESPACE_NAME` to build the correct URL, avoiding hardcoded values and certificate issues.

### ALLOWED_HOSTS Errors
If you see "Invalid HTTP_HOST header" errors, verify:
1. `ALLOWED_HOSTS` in `settings.py` includes your Codespace URL
2. The server was restarted after configuration changes

### MongoDB Connection Issues
Ensure MongoDB is running:
```bash
ps aux | grep mongod
```

If not running, start it:
```bash
mongod --dbpath /data/db --fork --logpath /tmp/mongod.log
```

## Next Steps

After verifying the backend:
1. Test creating data through the API (POST requests)
2. Set up the React frontend
3. Configure CORS if needed for frontend-backend communication
4. Implement authentication and authorization

## Example API Response

When you access `/api/`, you should see:
```json
{
    "users": "https://urban-fiesta-x95664gxq99fpqxv-8000.app.github.dev/api/users/",
    "teams": "https://urban-fiesta-x95664gxq99fpqxv-8000.app.github.dev/api/teams/",
    "activities": "https://urban-fiesta-x95664gxq99fpqxv-8000.app.github.dev/api/activities/",
    "leaderboard": "https://urban-fiesta-x95664gxq99fpqxv-8000.app.github.dev/api/leaderboard/",
    "workouts": "https://urban-fiesta-x95664gxq99fpqxv-8000.app.github.dev/api/workouts/"
}
```
