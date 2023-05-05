const express = require("express");
const serverless = require("serverless-http");
const body_parser = require("body-parser");

// Create an instance of the Express app
const app = express();

// Create a router to handle routes
const router = express.Router();

// parse requests of content-type - application/json
app.use(body_parser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

require("./app/routes/task.routes")(app);
require("./app/routes/subtask.routes")(app);

// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);

// Export the app and the serverless function
module.exports = app;
module.exports.handler = serverless(app);