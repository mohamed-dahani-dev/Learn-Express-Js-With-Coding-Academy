const mongoose = require("mongoose"); // get mongoose to call Schema
const Schema = mongoose.Schema; // get Schema from mongoose
// create the schema
const articleSchema = new Schema({
  title: String,
  body: String,
  date: Date,
  numberOfLikes: Number,
});
// create the model or the collection of databse
const Article = mongoose.model("Article", articleSchema);
// export the model
module.exports = Article
