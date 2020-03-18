var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');



//landing rounte
router.get('/',function(req,res){
    res.render('landing.ejs');
});

//==================Authentication Routes===========

//show register form
router.get('/register',function(req,res){
    res.render('register');
});
//register logic handler
router.post('/register',function(req,res){
    User.register(new User({username : req.body.username}),req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
            req.flash("error",err.message);
            res.redirect('/register');
        }
        //user registered, now login user
        passport.authenticate('local')(req,res,function(){
            req.flash("success","Welcome to Yelpamp, "+req.user.username);
            res.redirect('/campgrounds');
        });
    });
});
//show login form
router.get('/login',function(req,res){
    res.render('login');
});
//handle login logic
router.post('/login',passport.authenticate('local',{
        successRedirect : "/campgrounds",
        failureRedirect : "/login"
    }),
    function(req,res){}
);
//log out user
router.get('/logout',function(req,res){
    req.logout();
    req.flash("success","Successfully logged out!");
    res.redirect('/campgrounds');
});

module.exports = router;