import express from 'express';
import cors from 'cors';
import Gun from 'gun';
import path from 'path';

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the client's dist folder in production
if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientDistPath));
}

// Gun.js setup
const gun = Gun({
  web: app,
  file: 'radata', // local storage for Gun data
});

// Make Gun available to the app
app.gun = gun;

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gun server is running' });
});

// Fallback route for SPA in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

export { app };
