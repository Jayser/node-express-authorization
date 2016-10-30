const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

const cfg = require('./server/config');

// connect to db
mongoose.connect(cfg.db);

// Create a session middleware
app.use(session(cfg.session));

// Parse Cookie header and populate req.cookies.
app.use(cookieParser());

// set up jade for templating
app.set('views', cfg.views);
app.set('view engine', 'jade');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
require('./server/routes')(app);

app.listen(3000);
