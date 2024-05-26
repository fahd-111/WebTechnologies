const express = require('express');
// const {join} = require("path");
let server = express();
let bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.set("view engine", "ejs");
let ejsLayouts = require("express-ejs-layouts");
server.use(ejsLayouts);

server.use(express.static("public"));
// server.set('views', join(__dirname, 'views'));

server.get('/', (req, res) => {
    res.render('home', {
        pageClass: '', // Class for the header (no special class for home page)
        homeLinkClass: '/', // Class for Home link to indicate it's the current page
        aboutLinkClass: '#AboutUs', // Class for About link
        galleryLinkClass: '#Gallery', // Class for Gallery link
        mapsLinkClass: '', // Class for Maps link
        mapsLink: '/maps', // Class for Maps link
        addPlaceLink:'/add-place',
        addPlaceLinkClass: '',
    });
});

server.get('/contact', (req, res) => {
    res.render('contact', {
        pageClass: 'header-new-section', // Class for the header
        homeLinkClass: '/', // Class for Home link
        aboutLinkClass: '/#AboutUs', // Class for About link
        galleryLinkClass: '/#Gallery', // Class for Gallery link
        mapsLinkClass: '', // Class for Maps link
        mapsLink: '/maps', // Class for Maps link
        addPlaceLink:'/add-place',
        addPlaceLinkClass: ''
    });
});
server.get('/maps', (req, res) => {
    res.render('maps', {
        pageClass: 'header-new-section', // Class for the header
        homeLinkClass: '/', // Class for Home link
        aboutLinkClass: '/#AboutUs', // Class for About link
        galleryLinkClass: '/#Gallery', // Class for Gallery link
        mapsLinkClass: 'active',// Class for Maps link
        mapsLink: 'maps', // Class for Maps link
        addPlaceLink:'/add-place',
        addPlaceLinkClass: ''
    });
});

server.get('/add-place', (req, res) => {
    res.render('add-place', {
        pageClass: 'header-new-section', // Class for the header
        homeLinkClass: '/', // Class for Home link
        aboutLinkClass: '/#AboutUs', // Class for About link
        galleryLinkClass: '/#Gallery', // Class for Gallery link
        mapsLinkClass: '',// Class for Maps link
        mapsLink: 'maps', // Class for Maps link
        addPlaceLink:'/add-place',
        addPlaceLinkClass: 'active'
    });
});


server.get('/login', (req, res) => {
    res.render('Login', {
        includeHeader:false,
        includeFooter:false,

    });
});

server.get('/register', (req, res) => {
    res.render('register', {
        includeHeader:false,
        includeFooter:false,

    });
});


server.listen(3000)