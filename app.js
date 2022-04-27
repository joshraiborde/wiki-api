//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;
var now = new Date();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static("public"));

// create a new database called wikiDB
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

// create a new schema called articleSchema
const articleSchema = {
  title: String,
  content: String
};

// create a new mongoose model called Article, based on the articleSchema
// collection name is "Article"
// specify the schema, articleSchema
const Article = mongoose.model("Article", articleSchema);

app.route("/articles")

// GET request
.get((req, res) => {
  // READ
  Article.find((err, foundArticles) => {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err);
    }
  });
}) // verify that there isn't a semicolon ; here, or the code will stop here

// POST request
.post((req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });

  newArticle.save((err) => {
    if (!err) {
      res.send("Successfully added a new article on " + now.toUTCString());
    } else {
      res.send(
        err + " Error, could not add a new article on " + now.toUTCString()
      );
    }
  });
}) // verify that there isn't a semicolon ; here, or the code will stop here

// DELETE request
.delete((req, res) => {
  Article.deleteMany((err) => {
    if (!err) {
      res.send("Successfully deleted all articles on " + now.toUTCString());
    } else {
      res.send(
        err + " Error, could not delete all articles on " + now.toUTCString()
      );
    }
  });
}); // it is ok to have a semicolon ; here because we want the code to stop here

app.listen(port, () => {
  console.log("Server is running on Port " + port + " on " + now.toUTCString());
});
