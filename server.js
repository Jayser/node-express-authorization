const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const cfg = require('./server/config');

// connect to db
mongoose.connect(cfg.db);

// set secret for token
app.set('superSecret', cfg.token.secret);

// set up jade for templating
app.set('views', cfg.views);
app.set('view engine', 'jade');

// Parse Cookie header and populate req.cookies.
app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
require('./server/routes')(app);

app.listen(3000);
