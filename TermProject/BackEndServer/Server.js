const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const landscapesApiRouter = require('./routes/api/landscapes');

const app = express();

app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:63342"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use("/", landscapesApiRouter);

mongoose.connect("mongodb://localhost:27017/skyhike", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(4000, () => {
    console.log("Server started at localhost:4000");
});
// Compare this snippet from TermProject/BackEndServer/models/Landscape.js: