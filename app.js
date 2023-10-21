var express = require('express');

var app = express();
var methodOverride = require('method-override');
var connectFlash = require('connect-flash');
const dotenv = require('dotenv');
const path = require('path');
// var seedDB = require("./seed");

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });

var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./models/user');

var indexRoutes = require('./routes/index');
var campgroundRoutes = require('./routes/campground');
var commentRoutes = require('./routes/comment');
var kaffeine = require('./Kaffeine');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(methodOverride("_method"));

//===========Passport configuration=======

app.use(require('express-session')({
    secret: "I will surely succeed.",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(connectFlash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);

// seedDB();

app.get('*',function(req,res){
    res.render("errorPage");
})
app.listen(process.env.PORT || 5000 , function(){
    console.log('Server started succesfully at ' + process.env.PORT);
    kaffeine.setup();
    console.log('Kaffeine has been invoked.');
});