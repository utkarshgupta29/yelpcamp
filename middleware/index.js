var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middlewareObj = {};

middlewareObj.isAuthorizedCampground = function (req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,campground){
            if(err)
            {
                console.log(err)
                req.flash("error",err.message)
                res.redirect("back");
            }
            if(campground.author.id.equals(req.user._id)){
                next();
            }else{
                console.log("you don't have this permission");
                req.flash("error","you don't have this permission");
                res.redirect("back");
            }
        })
    }else{
        console.log("first login");
        req.flash("error","You need to login first!")
        res.redirect('back');
    }
}

middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please login first!");
    res.redirect('/login');
}
middlewareObj.isAuthorizedComment = function (req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.commentId,function(err,comment){
            if(err)
            {
                console.log(err)
                req.flash("error",err.message);
                res.redirect("back");
            }
            if(comment.author.id.equals(req.user._id)){
                next();
            }else{
                console.log("you don't have this permission");
                req.flash("error","You do not have this permission.");
                res.redirect("back");
            }
        })
    }else{
        req.flash("error","You must login first!");
        res.redirect('back');
    }
}
module.exports = middlewareObj;
