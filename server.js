// Here is where we import modules
// We begin by loading Express
const express = require("express");
const app = express();
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
const mongoose = require("mongoose"); // require package
// Import the Fruit model
const Fruit = require("./models/fruit.js");
app.use(express.urlencoded({ extended: false }));







// GET /
app.get("/", async (req, res) => {
    res.render('index.ejs');
  });
// POST /fruits
app.get('/fruits', async (req,res) =>{
    const foundFruits = await Fruit.find()
    res.send(foundFruits)
})
app.post("/fruits", async (req, res) => {
    console.log(req.body);
    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
      } else {
        req.body.isReadyToEat = false;
      }
      await Fruit.create(req.body);
    // res.redirect("fruits/new");
    res.redirect('/fruits')
  });
app.get("/fruits/new", (req, res) => {
    // res.send("This route sends the user a form page!");
    res.render("fruits/new.ejs");
  })









  
  mongoose.connect(process.env.MONGODB_URI);
  // log connection status to terminal on start
  mongoose.connection.on("connected", () => {
      console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
    });
  app.listen(3000, () => {
    console.log("Listening on port 3002");
  });