//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
require("dotenv").config() 

const app = express();
var now = new Date();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// create a new database
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

// create a new schema called articles
const articles = {
    title: String,
    content: String
  };
  
  // create a new mongoose based on the postSchema
  const Post = mongoose.model("Post", postSchema);

//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});