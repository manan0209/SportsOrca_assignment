const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Football-data.org API configuration
// API key from football-data.org for accessing live match data
const API_BASE_URL = 'https://api.football-data.org/v4';
const API_KEY = '8970e448d9534885b6cbaec1836a23cc'; // Your personal API token

// Route to serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API route to fetch upcoming matches
app.get('/api/matches', async (req, res) => {
    try {
        // Fetch matches from Premier League (competition code: PL)
        // For free tier, we can access limited competitions
        const response = await fetch(`${API_BASE_URL}/competitions/PL/matches?status=SCHEDULED`, {
            headers: {
                'X-Auth-Token': API_KEY
            }
        });

        if (!response.ok) {
            // If API key is not set or invalid, return mock data for demo purposes
            console.log('API request failed, returning mock data');
            return res.json({
                matches: [
                    {
                        id: 1,
                        homeTeam: { name: 'Manchester United', crest: '' },
                        awayTeam: { name: 'Liverpool', crest: '' },
                        utcDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
                        competition: { name: 'Premier League' }
                    },
                    {
                        id: 2,
                        homeTeam: { name: 'Chelsea', crest: '' },
                        awayTeam: { name: 'Arsenal', crest: '' },
                        utcDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
                        competition: { name: 'Premier League' }
                    },
                    {
                        id: 3,
                        homeTeam: { name: 'Manchester City', crest: '' },
                        awayTeam: { name: 'Tottenham', crest: '' },
                        utcDate: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
                        competition: { name: 'Premier League' }
                    },
                    {
                        id: 4,
                        homeTeam: { name: 'Brighton', crest: '' },
                        awayTeam: { name: 'Newcastle', crest: '' },
                        utcDate: new Date(Date.now() + 345600000).toISOString(), // 4 days from now
                        competition: { name: 'Premier League' }
                    }
                ]
            });
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ error: 'Failed to fetch matches' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API URL: https://api.football-data.org/v4`);
    console.log(`Note: To use real data, register for a free API key at https://www.football-data.org/client/register`);
});
