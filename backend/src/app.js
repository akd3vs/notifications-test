// require('dotenv').config();

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app);

// for testing purposes
app.get('/test', (req, res) => {
  res.status(200).send({ text: 'Simple Node App Working!', routes: app._router.stack });
});

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
