'use strict';
/*From this file create server with Express */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


/*Load routes that user */
const testRutas = require('./routes/test.routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', testRutas);

module.exports = app;

