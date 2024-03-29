var User = require('../../models/user');

module.exports = function (app, isValidUser) {
    app.get('/api/profile', isValidUser, function (req, res) {

        User.findOne({username: req.decoded.username}, function(err, user) {
            user.getVideos(function (err, user) {
                for (var i = 0; i < user.videos.length; i++) {
                    user.videos[i].liked = user.videos[i].likes.indexOf(user._id) > -1;
                }
                res.json({success: true, msg: 'User Profile', data: user});
            });
        });

    });

    app.get('/api/:username', isValidUser, function(req, res) {
        console.log(req.params.username);
        User.findOne({username: req.params.username}, function(err, user) {
            if (err) throw err;
            user.getVideos(function (err, user) {
                for (var i = 0; i < user.videos.length; i++) {
                    user.videos[i].liked = user.videos[i].likes.indexOf(user._id) > -1;
                }
                res.json({success: true, msg: 'User Profile', data: user});
            });
        });
    })
};