/**
 * Created by nicholas on 25/10/15.
 */
//var express = require('express');
//var apiRoutes = express.router();
var jwt = require('jsonwebtoken');

module.exports = function(app, passport) {
    app.post('/api/login',
        passport.authenticate('login'),
        function(req, res) {
            var payload = {username: req.user.username};
            var token = jwt.sign(payload, app.get('superSecret'), {
                expiresIn: 86400
            });

            res.json({
                success: true,
                message: 'Enjoy!',
                token: token
            });
        }
    );


    app.post('/react/login',
        User.findOne({ 'email' : email } , function(err, user) {

            // if errors, return the errors
            if (err) {
                return res.status(500).send({
                    success:false,
                    message: 'Server Error',
                    token: null
                });
            }

            // if user not found or invalid password
            if (!user || !user.validPassword(password)) {
                return res.status(403).json({
                    success: false,
                    message: 'Username or password is incorrect',
                    token: null
                });
            }

            // success: create token and send to client
            var payload = {username: req.user.username};
            var token = jwt.sign(payload, app.get('superSecret'), {expiresIn: 86400});
            return res.status(200).json({
                success: true,
                message: 'Welcome to video45',
                token: token
            });
        })
    )

};