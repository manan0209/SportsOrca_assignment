// API endpoint for fetching matches
const API_ENDPOINT = '/api/matches';

// DOM elements
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const matchesContainer = document.getElementById('matchesContainer');

// Load matches when page loads
document.addEventListener('DOMContentLoaded', loadMatches);

async function loadMatches() {
    try {
        showLoading();
        hideError();
        
        const response = await fetch(API_ENDPOINT);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        displayMatches(data.matches);
        hideLoading();
        
    } catch (error) {
        console.error('Error loading matches:', error);
        hideLoading();
        showError();
    }
}

function displayMatches(matches) {
    matchesContainer.innerHTML = '';
    
    if (!matches || matches.length === 0) {
        matchesContainer.innerHTML = `
            <div class="match-card">
                <p style="text-align: center; color: #666;">No upcoming matches found.</p>
            </div>
        `;
        return;
    }
    
    matches.forEach(match => {
        const matchCard = createMatchCard(match);
        matchesContainer.appendChild(matchCard);
    });
}

function createMatchCard(match) {
    const matchElement = document.createElement('div');
    matchElement.className = 'match-card';
    
    const matchDate = new Date(match.utcDate);
    const formattedDate = formatDate(matchDate);
    const formattedTime = formatTime(matchDate);
    
    matchElement.innerHTML = `
        <div class="match-header">
            <div class="competition">${match.competition?.name || 'Premier League'}</div>
            <div class="match-date">${formattedDate}</div>
        </div>
        
        <div class="teams-container">
            <div class="team">
                <div class="team-crest">⚽</div>
                <div class="team-name">${match.homeTeam.name}</div>
            </div>
            
            <div class="vs">VS</div>
            
            <div class="team">
                <div class="team-crest">⚽</div>
                <div class="team-name">${match.awayTeam.name}</div>
            </div>
        </div>
        
        <div class="match-time">
            <strong>Kick-off:</strong> ${formattedTime}
        </div>
    `;
    
    return matchElement;
}

function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

function formatTime(date) {
    const options = { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZoneName: 'short'
    };
    return date.toLocaleTimeString('en-US', options);
}

function showLoading() {
    loadingElement.style.display = 'block';
    matchesContainer.style.display = 'none';
}

function hideLoading() {
    loadingElement.style.display = 'none';
    matchesContainer.style.display = 'block';
}

function showError() {
    errorElement.style.display = 'block';
    matchesContainer.style.display = 'none';
}

function hideError() {
    errorElement.style.display = 'none';
}
