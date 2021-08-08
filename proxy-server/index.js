const express = require('express');
const morgan = require("morgan");
const cors_proxy = require('cors-anywhere');

// Create Express Server
const app = express();

// Configuration
const PORT = 3001;
const HOST = "localhost";
const API_SERVICE_URL = "https://www.metaweather.com/api";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
  res.send('This is a proxy service which proxies to Meta Weather APIs.');
});

cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2']
}).listen(PORT, HOST, function() {
  console.log('Running CORS Anywhere on ' + HOST + ':' + PORT);
});