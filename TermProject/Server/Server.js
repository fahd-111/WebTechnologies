const express = require('express');
// const {join} = require("path");
let server = express();

server.set("view engine","ejs");
server.use(express.static("public"));
// server.set('views', join(__dirname, 'views'));
server.get('/', (req, res) => {
    // res.send({name:'Hashim'});

    res.render('Login')
})

server.listen(3000)