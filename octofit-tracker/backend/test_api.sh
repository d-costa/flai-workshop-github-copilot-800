#!/bin/bash

# Test API Endpoints Script for OctoFit Tracker
# This script tests all REST API endpoints

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the base URL based on environment
if [ -n "$CODESPACE_NAME" ]; then
    BASE_URL="https://${CODESPACE_NAME}-8000.app.github.dev"
    echo -e "${YELLOW}Testing on Codespace URL: ${BASE_URL}${NC}\n"
else
    BASE_URL="http://localhost:8000"
    echo -e "${YELLOW}Testing on localhost: ${BASE_URL}${NC}\n"
fi

# Function to test an endpoint
test_endpoint() {
    local endpoint=$1
    local method=${2:-GET}
    local description=$3
    
    echo -e "${YELLOW}Testing ${method} ${endpoint}${NC}"
    echo -e "Description: ${description}"
    
    response=$(curl -s -w "\n%{http_code}" -X ${method} "${BASE_URL}${endpoint}")
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" -eq 200 ] || [ "$http_code" -eq 201 ]; then
        echo -e "${GREEN}✓ Success (HTTP ${http_code})${NC}"
        echo "$body" | python3 -m json.tool 2>/dev/null || echo "$body"
    else
        echo -e "${RED}✗ Failed (HTTP ${http_code})${NC}"
        echo "$body"
    fi
    echo -e "\n${YELLOW}----------------------------------------${NC}\n"
}

# Test the API root
test_endpoint "/api/" "GET" "API Root - Lists all available endpoints"

# Test Users endpoint
test_endpoint "/api/users/" "GET" "Get all users"

# Test Teams endpoint
test_endpoint "/api/teams/" "GET" "Get all teams"

# Test Activities endpoint
test_endpoint "/api/activities/" "GET" "Get all activities"

# Test Leaderboard endpoint
test_endpoint "/api/leaderboard/" "GET" "Get leaderboard"

# Test Workouts endpoint
test_endpoint "/api/workouts/" "GET" "Get all workouts"

echo -e "${GREEN}API Testing Complete!${NC}"
