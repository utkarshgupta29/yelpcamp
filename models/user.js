var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelpcamp',{useNewUrlParser : true,useUnifiedTopology : true});

var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username : String,
    password : String
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);