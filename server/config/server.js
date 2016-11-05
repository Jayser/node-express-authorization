module.exports.session = {
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  name: 'auth-cn',
  cookie: {
    secure: false, // Note be careful when setting this to true, as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection.
    maxAge: 864000000 // 10 Days
  }
};

module.exports.views = './server/views';
