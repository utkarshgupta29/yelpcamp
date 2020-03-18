var Campground = require("../models/campground");
var Comment = require("../models/comment");
var express = require('express');
var router = express.Router({mergeParams:true});
var middlewareObj = require('../middleware');

router.get('/new',middlewareObj.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err)
            console.log(err);
        else{
            res.render("comment/new.ejs",{campground:foundCampground});
        }
    })
})
router.post('/',middlewareObj.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err)
        { 
            req.flash("error",err.message);
            res.redirect("back");
        }else{

            req.body.comment.author = {
                id : req.user._id,
                username : req.user.username
            };
            Comment.create(req.body.comment,function(err,savedComment){
                if(err)
                    console.log(err);
                else{
                    foundCampground.comments.push(savedComment);
                    foundCampground.save();
                    req.flash("success","Comment added successfully!");
                    res.redirect('/campgrounds/'+req.params.id);
                }
            })
        }
    })
})
// Edit Route
router.get('/:commentId/edit',middlewareObj.isAuthorizedComment,function(req,res){
    Comment.findById(req.params.commentId,function(err,comment){
        if(err)
        {
            req.flash("error",err.message);
            res.redirect("back");
        
        }
        else{
            res.render('comment/edit',{comment:comment,campgroundId:req.params.id});
        }
    })
});
// Update Route
router.put('/:commentId',middlewareObj.isAuthorizedComment,function(req,res){

    Comment.findByIdAndUpdate(req.params.commentId,req.body.comment,function(err,data){
        if(err){
            req.flash("error",err.message);
            res.redirect("back");
        }
        else{
            req.flash("success","Comment updated successfully");
            res.redirect('/campgrounds/'+req.params.id);
        }
    })
});
//DELETE Route
router.delete('/:commentId',middlewareObj.isAuthorizedComment,function(req,res){
    Comment.findByIdAndRemove(req.params.commentId,function(err,data){
        if(err){
            req.flash("error",err.message);
            res.redirect("/");
        }
        else    
        {
            req.flash("success","Comment deleted successfully!");
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

module.exports = router;