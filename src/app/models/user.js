//  app/models/user.js

// load dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
require('./video');
require('./comment');

var userSchema = Schema({
    //_id         : Number,
    email       : String,
    password    : String,
    username    : String,
    firstName   : String,
    lastName    : String,
    profilePic  : { type: String, default: '/public/img/default-profile-pic.png' },
    facebook        : {
        id          : String,
        token       : String,
        email       : String,
        name        : String
    },
    twitter         : {
        id          : String,
        token       : String,
        username    : String,
        name        : String
    },
    google          : {
        id          : String,
        token       : String,
        email       : String,
        name        : String
    },
    videos : [{ type: Schema.Types.ObjectId, ref: 'Video'}]
});

// user methods ================================================================
// generate hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.getVideos = function(err, callback) {
    async.forEach(this.videos, function(video) {
        this.model('Video').findById(video)
    });
};

var deepPopulate = require('mongoose-deep-populate')(mongoose);
userSchema.plugin(deepPopulate, { whitelist: ['videos', 'comment']});

// export model ================================================================
module.exports = mongoose.model('User', userSchema);


