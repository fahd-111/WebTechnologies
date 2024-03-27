const express = require("express");
const mongoose = require("mongoose");
const Landscapes = require("./models/Landscape");
let server = express();
server.use(express.json());

let mobileApiRouter = require("./routes/api/landscapes");
server.use("/", mobileApiRouter);

//mongoose accepts a connection string to your db and attempts a connections here
mongoose.connect("mongodb://localhost:27017/skyhike ").then((data) => {
    console.log("DB Connected");
    // console.log(data);
});
server.listen(4000, () => {
    console.log("Server started at localhost:4000");
});
