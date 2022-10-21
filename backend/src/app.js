const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const api = require('./api');

require('./config/middleware')(app);

// Database setup
const mongoose = require('mongoose');
const config = require('./config/config');

// Drop Testing Database
const options = {
  useNewUrlParser: true
};
mongoose.connect(config.db.url, options).then(
  () => {
    console.log(config.db.url);
    console.log("Connected databasse");
  },
  err => {
    console.log(err);
  }
);

// setup the api
app.use('/api', api);

// Client error handling
app.use((err, req, res, next) => {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
})

// Global error handling
app.use((err, req, res, next) => {
    console.log("===== error: ", err);
    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({ error: 'Invalid token' });
    }
    return res.status(500).send({ error: 'Something went wrong.' });
})

module.exports = app;