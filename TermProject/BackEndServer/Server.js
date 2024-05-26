const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('config');
const session = require('express-session');

const landscapesApiRouter = require('./routes/api/landscapes');
const usersApiRouter = require('./routes/api/auth');

const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

app.use(session({
    secret: config.get('sessionSecret'),
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    },
    name: 'SkyHikeSession',
}));

app.use(cors({
    origin: ['http://localhost:3000']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to set res.locals.user
app.use((req, res, next) => {
    if (req.session && req.session.userId) {
        res.locals.user = {
            _id: req.session.userId,
            roles: req.session.userRoles,
            data: JSON.parse(req.session.userData) // Ensure userData is parsed from JSON
        };
    } else {
        res.locals.user = null;
    }
    next();
});

// Set view engine to EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', landscapesApiRouter);
app.use('/', usersApiRouter);

mongoose.connect('mongodb://localhost:27017/skyhike', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(4000, () => {
    console.log('Server started at http://localhost:4000');
});
