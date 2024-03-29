const mongoose = require('../dbcontext');

var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    username : String,
    password : String
});
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);