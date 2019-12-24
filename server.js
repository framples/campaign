require("dotenv").config();

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");


//Middleware
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

//Serve static assets
app.use(express.static(path.join(__dirname, "/client/build")));

//Definte API routes
app.use(routes);

//Connect with MONGODB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/gamesdb");

//Listen for server start
app.listen(PORT, () => {
  console.log("API server is now running on port :" + PORT)
})

