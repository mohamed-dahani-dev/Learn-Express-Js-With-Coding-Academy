const express = require("express"); // get the express framework
const app = express(); // stored express in variable
app.use(express.json()); // get the body parameters
const port = 3000; // create a port for the server
const mongoose = require("mongoose"); // get the mongoose to connect with database
const Article = require("./model/Article"); // import the Article from the the model folder
// get request
app.get("/hello", (req, res) => {
  res.send("you visited hello");
});
// post request
app.post("/addComment", (req, res) => {
  res.send("pls add comment");
});
app.get("/numbers", (req, res) => {
  let numbers = "";
  for (let i = 1; i <= 100; i++) {
    numbers += i + "-";
  }
  res.send(numbers);
});
// path parameters = get data from the path and we need to use : before the path like the example to be the path dynamically
app.get("/findSummationPath/:num1/:num2", (req, res) => {
  // [req.params] = this is how to get the path parameters
  const num1 = req.params.num1;
  const num2 = req.params.num2;
  const summ = +num1 + +num2; // get the summation and transfer the type string to the number
  res.send(`num1 = ${num1} num2 = ${num2} and the summ is ${summ}`);
});
// body parameters = get the data from the api or JSON
app.get("/findNameBody", (req, res) => {
  // [req.body] = this is how to get the body parameters
  const name = req.body.name;
  const age = req.body.age;
  res.send(`Hello ${name} you age is ${age}`);
});
// query parameters = get data from also the path and we need to use ? before the path like the example to be the path dynamically
app.get("/findNameQuery", (req, res) => {
  // example of link query = http://localhost:3000/findNameQuery?name=Mohamed
  // [req.query] = this is how to get the query parameters
  const name = req.query.name;
  res.send(`Hello ${name}`);
});
// build api to frontEnd dev
app.get("/buildApi", (req, res) => {
  res.json({
    name: req.body.name,
    age: req.body.age,
  });
});
// how to use html file in express
app.get("/dirName", (req, res) => {
  // __dirname = use to get file html
  // res.sendFile(__dirname + "/views/index.ejs");
  // when use ejs file you have to use render function
  res.render("index.ejs", { name: "Mohamed" });
});
// connect with database
mongoose
  .connect("mongodb://localhost/articleDB")
  .then(() => {
    console.log("successfully connected");
  })
  .catch((err) => {
    console.log("Eroor of connection" + " " + err);
  });

//------------------------ fill the database ----------------------------------------
// post request in the database
app.post("/article", async (req, res) => {
  // recommended to use try and catch to know the error or catch him
  try {
    const newArticle = new Article(); // create a new Article form the Article
    // fill the variables with the body parameters
    const title = req.body.title;
    const body = req.body.body;
    const date = req.body.date;
    const numbersOfLikes = req.body.numbersOfLikes;
    // fill the article with the variables
    newArticle.title = title;
    newArticle.body = body;
    newArticle.date = date;
    newArticle.numbersOfLikes = numbersOfLikes;
    // save the new article in the database but also you need to use promises befor the response like .then and .catch or async and await
    await newArticle.save();
    // return the new article like JSON to used from the frontEnd dev
    res.json(newArticle);
    return; // we use return after the code to stop the code
  } catch (err) {
    res.send(err);
  }
});
// get request in the database
app.get("/article", async (req, res) => {
  // recommended to use try and catch to know the error or catch him
  try {
    const articles = await Article.find(); // get all articles from the database but also you need to use promises befor the response like .then and .catch or async and await
    res.json(articles);
    return; // we use return after the code to stop the code
  } catch (err) {
    res.send(err);
  }
});
// find article by id
app.get("/article/:articleId", async (req, res) => {
  // recommended to use try and catch to know the error or catch him
  try {
    const id = req.params.articleId;
    const article = await Article.findById(id);
    res.json(article);
    return; // we use return after the code to stop the code
  } catch (err) {
    res.send(err);
  }
});
// delete the article by id
app.delete("/article/:articleId", async (req, res) => {
  // recommended to use try and catch to know the error or catch him
  try {
    const id = req.params.articleId;
    const article = await Article.findByIdAndDelete(id);
    res.json(article);
  } catch (err) {
    res.send(err);
  }
});
// listen on port and start the server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
