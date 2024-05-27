const mongoose = require('mongoose');

const placesSchema = new mongoose.Schema({
    // Define your schema here, for example:
    name: String,
    description: String,
    imageURL: String,
    // More fields as needed
});

const Places = mongoose.model('Places', placesSchema);
module.exports = Places;