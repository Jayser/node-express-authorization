const user = require('../api/user');
const jwt = require('jsonwebtoken');
const cfg = require('../config');

module.exports = (app) => {

    function isAuthorized(req, res, next)  {
        const token = req.cookies.token;

        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), (err, decoded) => {
                if (err) {
                    return res.json({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.render('home');
        }
    }

    app.get('/', isAuthorized, (req, res) => {
        res.render('home', { username: req.decoded._doc.username });
    });

    app.post('/login', (req, res) => {

        user.checkUser(req.body)
            .then(user => {
                if (user) {
                    // set token
                    const token = jwt.sign(user, app.get('superSecret'), cfg.token.cfg);
                    res.cookie('token', token, cfg.token.cookie);
                    res.redirect('/');
                }
            })
            .catch(err => {
                res.json({error: err.toString()});
            });
    });

    app.post('/registration', function (req, res) {
        user.createUser(req.body)
            .then(() => {
                res.send(200);
            })
            .catch(err => {
                res.json({error: err.toString()});
            })
    });

    app.get('/logout', (req, res) => {
        // clear token
        res.clearCookie("token", {path: '/'});
        res.redirect('/');
    });

};
