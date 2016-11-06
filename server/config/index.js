module.exports = {
  db: require('./db'),
  token: {
    secret: 'sarhan',
    cfg: {
      expiresIn: 86400 // expires in 24 hours
    },
    cookie: {
      httpOnly: true,
      expires: new Date(Date.now() + 900000),
      path: '/'
    }
  },
  views: './server/views'
};
