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

// GET
app.get("/articles", (req, res) => {
  // READ
  Article.find((err, foundArticles) => {
    if (!err) {
      res.send(foundArticles);
    } else {
      res.send(err)
    }
  });
});

app.listen(port, () => {
  console.log("Server is running on Port " + port + " on " + now.toUTCString());
});
