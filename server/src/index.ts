import cors from 'cors';
import path from 'path';
import './types/express';
import http from 'http';
import Gun from 'gun';
import express from 'express';

// Initialize Express
const app = express();
app.port = parseInt(process.env.PORT || "3000");

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the client's dist folder in production
if (process.env.NODE_ENV === 'production') {
  const clientDistPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientDistPath));
}

// API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Gun server is running on ' + app.port });
});

// Fallback route for SPA in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}
const server = http.createServer(app);
server.listen(app.port, () => {
  console.log(`Server running on port ${app.port}`);
  console.log(`Gun server peer accessible at http://localhost:${app.port}/gun`);
});


const gun = Gun({
  web: server,
  file: 'radata' + (app.port || ""),
  // peers: ['http://localhost:3000/gun', 'http://localhost:3001/gun'],
});



const tb = gun.get('tribelike');
const hb = tb.get('heartbeat');

hb.on((data) => {
  console.log('Heartbeat', app.port, ": ", data);
});

app.get('/hb', (req, res) => {
  const data = 'heartbeat' + app.port?.toString() + ' ' + new Date().toISOString();
  hb.put(data);
  res.sendStatus(200);
});

tb.get('port').put(app.port.toString());
