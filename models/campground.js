const mongoose = require('../dbcontext');

var campgroundSchema = new mongoose.Schema({
    name : String,
    image : [String],
    description : String,
    price : Number,
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username: String
    },
    created : {type:Date, default:Date.now},
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports = mongoose.model("Campground",campgroundSchema);