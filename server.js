const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// configuring path to .env file
dotenv.config({path: "./config/config.env"});

// creating an express application
const app = express();

// connecting with database
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(result => {
    console.log("Application successfully connected with database.");
})
.catch(err => {
    console.log(`Following err occurred while connecting with database: ${err}`);
})

// use /public folder to use static files
app.use(express.static(__dirname + "/public"));

// support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({extended: true}));

// support parsing of application/json type post data
app.use(express.json());

// blog routes
app.use("/api/v1/blogs", blogRoutes);

// listening application on assigned port
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log(`Application is up and running on port: ${PORT}`)
})