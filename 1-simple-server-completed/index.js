const express = require('express');
const app = express();
const gifs = require('./gifs.json');

// controllers
const serveHello = (req, res, next) => {
  console.log(req.query); // { first: "ben", last: "spector" }

  const { first, last } = req.query;
  if (!first || !last) {
    return res.send(`hello stranger!`);
  }
  res.send(`hello ${first} ${last}!`);
}

const serveData = (req, res, next) => {
  const filter = req.query.filter
  const data = [{ name: 'ben' }, { name: 'zo' }, { name: 'carmen' }];

  if (!filter) res.send(data);
  const filteredData = data.filter((item) => item.name === filter);
  res.send(filteredData);
}

const serveStatus = (req, res, next) => {
  res.sendStatus(200);
}

// endpoints
app.get('/api/hello', serveHello);
app.get('/api/data', serveData);
app.get('/api/ping', serveStatus);

// Once you've configured everything, start listening!
const port = 8080;
app.listen(port, () => {
  console.log(`Server is now running on http://localhost:${port}`);
});