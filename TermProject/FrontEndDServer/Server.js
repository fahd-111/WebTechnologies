const express = require('express');
// const {join} = require("path");
let server = express();

server.use(express.json())
server.set("view engine","ejs");
server.use(express.static("public"));
// server.set('views', join(__dirname, 'views'));
server.get('/', (req, res) => {
    // res.send({name:'Hashim'});

    res.render('home')
})

server.get('/contact',(req , res) =>{
    res.render("contact")
})

server.listen(3000)