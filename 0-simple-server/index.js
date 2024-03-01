// Imports:
const data = require('./db/data.js'); // our mock data
const express = require('express');   // used to configure the express server

// The `app` object configures the server
const app = express();

// Controllers:
const serveIndex = (req, res, next) => res.sendFile(__dirname + '/index.html');
const serveAbout = (req, res, next) => res.send('<h1>About</h1>');
const serveData = (req, res, next) => res.send(data);
const serveHello = (req, res, next) => res.send('hello');

// Routes:
app.get('/', serveIndex);
app.get('/about', serveAbout);
app.get('/api/hello', serveHello);
app.get('/api/data', serveData);


// Once you've configured everything, start listening!
const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});