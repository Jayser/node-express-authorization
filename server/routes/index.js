const user = require('../api/user');

module.exports = (app) => {

  app.get('/', (req, res) => {
    res.render('home', {
        user: {
            username: req.session.user && req.session.user.username
        }
    });
  });

  app.post('/login', (req, res, next) => {
  	if (req.session.user) return res.redirect('/');

  	user.checkUser(req.body)
  		.then(user => {
  			if(user){
  				req.session.user = {
					id: user._id,
                    username: user.username
  				};
                res.redirect('/');
  			} else {
  				return next(error)
  			}
  		})
  		.catch(err => {
  			return next(err);
  		});
  });

  app.post('/createUser', function(req, res) {
    user.createUser(req.body)
    	.then(() => {
			res.send(200);
    	})
    	.catch(err => {
			res.status(500).send(err);
    	})
  });

  app.get('/logout', (req, res) => {
  	if (req.session.user) {
        req.session.destroy(function (err) {
            res.clearCookie("auth-cn", { path: '/' });
            res.redirect('/');
        });
  	}
  });

};
