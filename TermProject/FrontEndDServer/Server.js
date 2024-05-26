const express = require('express');
// const {join} = require("path");
let server = express();
let bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.set("view engine", "ejs");
const cookieParser = require('cookie-parser');
server.use(cookieParser());
let ejsLayouts = require("express-ejs-layouts");
const {get} = require("lodash");
server.use(ejsLayouts);

server.use(express.static("public"));
// server.set('views', join(__dirname, 'views'));

server.get('/', (req, res) => {
    const userData = req.cookies.userData ? JSON.parse(req.cookies.userData) : null;

    console.log(userData);

    // console.log(User)
    res.render('home', {
        pageClass: '', // Class for the header (no special class for home page)
        homeLinkClass: '/', // Class for Home link to indicate it's the current page
        aboutLinkClass: '#AboutUs', // Class for About link
        galleryLinkClass: '#Gallery', // Class for Gallery link
        mapsLinkClass: '', // Class for Maps link
        mapsLink: '/maps', // Class for Maps link
        addPlaceLink:'/add-place',
        addPlaceLinkClass: '',
        user:userData || ""
    });
});

server.get('/contact', (req, res) => {
    const userData = req.cookies.userData ? JSON.parse(req.cookies.userData) : null;

    console.log(userData);
    res.render('contact', {
        pageClass: 'header-new-section', // Class for the header
        homeLinkClass: '/', // Class for Home link
        aboutLinkClass: '/#AboutUs', // Class for About link
        galleryLinkClass: '/#Gallery', // Class for Gallery link
        mapsLinkClass: '', // Class for Maps link
        mapsLink: '/maps', // Class for Maps link
        addPlaceLink:'/add-place',
        addPlaceLinkClass: '',
        user:userData || ""
    });
});
server.get('/maps', (req, res) => {
    const userData = req.cookies.userData ? JSON.parse(req.cookies.userData) : null;

    res.render('maps', {
        pageClass: 'header-new-section', // Class for the header
        homeLinkClass: '/', // Class for Home link
        aboutLinkClass: '/#AboutUs', // Class for About link
        galleryLinkClass: '/#Gallery', // Class for Gallery link
        mapsLinkClass: 'active',// Class for Maps link
        mapsLink: 'maps', // Class for Maps link
        addPlaceLink:'/add-place',
        addPlaceLinkClass: '',
        user:userData || ""
    });
});

server.get('/add-place', (req, res) => {
    const userData = req.cookies.userData ? JSON.parse(req.cookies.userData) : null;

    res.render('add-place', {
        pageClass: 'header-new-section', // Class for the header
        homeLinkClass: '/', // Class for Home link
        aboutLinkClass: '/#AboutUs', // Class for About link
        galleryLinkClass: '/#Gallery', // Class for Gallery link
        mapsLinkClass: '',// Class for Maps link
        mapsLink: 'maps', // Class for Maps link
        addPlaceLink:'/add-place',
        addPlaceLinkClass: 'active',
        user:userData || ""
    });
});


server.get('/login', (req, res) => {

    res.render('Login', {
        includeHeader:false,
        includeFooter:false,
        user:""

    });
});

server.get('/register', (req, res) => {
    res.render('register', {
        includeHeader:false,
        includeFooter:false,
        user:""
    });
});


server.listen(3000)