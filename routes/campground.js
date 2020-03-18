var Campground = require("../models/campground");
var Comment = require("../models/comment");
var express = require('express');
var router = express.Router();
var middlewareObj = require('../middleware');


//=========================================
//  CAMPGROUND ROUTES
//=========================================


// INDEX ROUTE - SHOW ALL CAMPGROUNDS
router.get('/',function(req,res){
    Campground.find({},function(err,campgrounds){
        if(err)
        {
            req.flash("error",err.message);
            res.redirect("back");
        }else
           res.render('campground/index.ejs',{campgrounds:campgrounds});
    })
});
//CREATE ROUTE - CREATE A NEW CAMPGROUND
router.post('/',middlewareObj.isLoggedIn,function(req,res){
    var name1 = req.body.name;
    var price = req.body.price;
    var image1 = req.body.image1;
    var image2 =  req.body.image2;
    var image3 =  req.body.image3;
    var image = [image1];
    if(!image2.trim()=="")
        image.push(image2);
    if(!image2.trim()=="")
        image.push(image3);
    var description1 = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    var camp = {
        name : name1,
        image  : image,
        description : description1,
        author : author,
        price : price
    };
    Campground.create(camp,function(err,campground){
        if(err){
            req.flash("error",err.message);
            res.redirect("back");
        }else{
            req.flash("success","Campground created successfully!");
            res.redirect('/campgrounds');
        }
    })
});
//NEW ROUTE - TO SHOW NEW CAMPGROUND FORM 
router.get('/new',middlewareObj.isLoggedIn,function(req,res){
    res.render('campground/new.ejs');
});
//SHOW ROUTE - TO SHOW INFO ABOUT ONE CAMPGROUND
router.get('/:id',function(req,res){
    
    Campground.findById(req.params.id).populate("comments").exec(function(err,campground){
        if(err){ 
               req.flash("error",err.message);
               console.log(err);
        }
        else
        {
            console.log(campground);
            res.render("campground/show.ejs",{campground:campground});
        }
    });
   
});
// Edit Route
router.get('/:id/edit',middlewareObj.isAuthorizedCampground,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            req.flash("error",err.message);
            res.redirect("/campgrounds");
        }else{
            res.render("campground/edit",{campground:foundCampground});
        }
    });
});
// Update Route
router.put('/:id',middlewareObj.isAuthorizedCampground,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            req.flash("error",err.message);
            res.redirect("/campgrounds");
        }
        else{
            var image = [req.body.image1];
            if(!req.body.image2.trim()=="")
                image.push(req.body.image2);
            if(!req.body.image3.trim()=="")
                image.push(req.body.image3);
            foundCampground.name = req.body.name;
            foundCampground.price = req.body.price;
            foundCampground.image = image;
            foundCampground.description = req.body.description;
            foundCampground.save();
            req.flash("success","Campground updated successfully!");
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});
//DELETE Route
router.delete('/:id',middlewareObj.isAuthorizedCampground,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err,data){
        if(err){
            console.log(err);
            req.flash("error",err.message);
            res.redirect("/");
        }
        else    
        {
            req.flash("success","Campground deleted successfully!");
            res.redirect('/campgrounds');
        }
    });
});



module.exports = router;