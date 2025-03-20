const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const routes = require('./routes');
const bodyParser = require("body-parser");
dotenv.config()

const app = express()
const port = process.env.PORT || 3001 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


routes(app);



mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log('Connect Db success')
    })
    .catch((err) => {
        console.log(err)
    })


app.listen(port, () => {
    console.log("Server is running in port", + port)
}) 