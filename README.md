# Soccer Matches App

A web application that displays upcoming soccer matches using the football-data.org API.

## Features

- 📅 Display upcoming Premier League matches
- 🕐 Show match date and time
- ⚽ Team names and match details
- 🔄 Refresh functionality
- 📱 Responsive design

## API Information

This app uses the **football-data.org API** (https://api.football-data.org/v4) to fetch soccer match data.

- **API URL**: `https://api.football-data.org/v4`
- **Free Tier**: Provides access to Premier League and other major competitions
- **Rate Limit**: 10 calls per minute for free tier
- **Registration**: Get your free API key at https://www.football-data.org/client/register

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Get API Key (Optional for demo)**
   - Visit https://www.football-data.org/client/register
   - Register for a free account
   - Copy your API key
   - Replace `YOUR_API_KEY_HERE` in `server.js` with your actual API key

3. **Run the Application**
   ```bash
   npm start
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:3000`

## Project Structure

```
├── package.json          # Node.js dependencies and scripts
├── server.js             # Express.js backend server
├── public/
│   ├── index.html        # Main HTML page
│   ├── styles.css        # CSS styling
│   └── script.js         # Frontend JavaScript
└── README.md            # This file
```

## How It Works

### Backend (server.js)
- Express.js server that serves the frontend and provides API endpoints
- `/api/matches` endpoint fetches data from football-data.org API
- Includes mock data fallback for demo purposes when API key is not configured
- CORS enabled for frontend-backend communication

### Frontend (public/)
- **index.html**: Main page structure with loading states and match display
- **styles.css**: Modern, responsive styling with gradient background and card-based layout
- **script.js**: Fetches data from backend API and dynamically renders match cards

## Features in Detail

- **Real-time Data**: Fetches live upcoming match data from football-data.org
- **Error Handling**: Graceful fallbacks and retry functionality
- **Loading States**: Spinner and loading indicators
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, card-based design with hover effects

## Demo Mode

If no API key is configured, the app will display mock Premier League matches with realistic team names and future dates for demonstration purposes.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla HTML, CSS, JavaScript
- **API**: football-data.org REST API
- **Styling**: CSS Grid, Flexbox, CSS animations
