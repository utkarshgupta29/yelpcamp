var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [

    {
        name:'park1',
        image:'https://image.shutterstock.com/image-photo/panorama-beautiful-city-park-600w-523559155.jpg',
        description : 'This is a sample park photo where you can enjoy greenry!'
    },
    {
        name:'park2',
        image:'https://image.shutterstock.com/image-photo/panorama-beautiful-city-park-600w-523559155.jpg',
        description : 'This is a sample park photo where you can enjoy greenry!'
    },
    {
        name:'park3',
        image:'https://image.shutterstock.com/image-photo/panorama-beautiful-city-park-600w-523559155.jpg',
        description : 'This is a sample park photo where you can enjoy greenry!'
    }

];

var seed = function(){

    Campground.remove({},function(err,removedCampgrounds){
        if(err)
            console.log(err);
        else
        {
            console.log('campground deleted'+removedCampgrounds);
            Comment.remove({},function(err,removedComments){
                if(err)
                    console.log(err);
                else{
                    data.forEach(function(campground){
                        Campground.create(campground,function(err,savedCampground){
                            if(err)
                                console.log(err);
                            else{
                                var comment = new Comment({
                                    text : "this is a demo comment",
                                    author : 'utkarsh'
                                });
                                comment.save(function(err,savedComment){
                                    if(err)
                                        console.log(err);
                                    else{
                                        savedCampground.comments.push(savedComment);
                                        savedCampground.save();
                                        console.log(savedCampground);
                                    }
                                })
                            }
                        })
                    })
        
                }
            })
            console.log("campground saved");
        }
    })
    
}
module.exports = seed;