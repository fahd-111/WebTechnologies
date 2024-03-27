const mongoose = require('mongoose');

const landscapeSchema = new mongoose.Schema({
    // Define your schema here, for example:
    name: String,
    description: String,
    // More fields as needed
});

const Landscape = mongoose.model('Landscape', landscapeSchema);

module.exports = Landscape;