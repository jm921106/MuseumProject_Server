/**
 * Created by superMoon on 2016-08-17.
 */

var User = require('mongoose').model('User');

exports.create = function (req, res, next) {

    console.log("test");
    console.log(req.body.firstName);

    new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    }).save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.redirect("/user");
        }
    });
};

exports.list = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.read = function (req, res) {
        res.json(req.user);
};

exports.userByID = function (req, res, next, id) {
    User.findOne({
        _id : id
    }, function(err, user) {
        if(err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

// update() , findOneAndUpdate(), findByIdAndUpdate()
exports.update = function (req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function (err, user) {
            if(err) {
                return next(err);
            } else {
                res.json(user);
            }
        });
};

//remove() , findOneAndRemove(), findByAndRemove()
exports.delete = function (req, res, next) {
    req.user.remove(function (err) {
        if(err) {
            return next(err);
        } else {
            res.json(req.user);
        }
    });
};

// // 이름과 이메일만 인출하고 싶을때
// User.find({}, 'username email', function(err, users) {
//    // ...
// });

// // skip and limit
// User.find({}, 'username email', {
//     skip : 10,
//     limit : 10
// }, function (err, users) {
//    // ... 
// });

