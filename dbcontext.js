var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/yelpcamp',{useNewUrlParser : true,useUnifiedTopology : true});

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ej0msoj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
