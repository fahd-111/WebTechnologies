let express = require("express");
let router = express.Router();
const Places = require("../../models/Places");


router.get("/api/places", async function (req, res) {
    let places = await Places.find();
    return res.send(places);
});
router.post("/api/places", async (req, res) => {
    let data = req.body;
    let record = new Places({
        name: data.name,
        description: data.description,
        imageURL: data.imageURL // Ensure consistent handling of imageURL field
    });
    try {
        await record.save();
        console.log(record,req.body)
        return res.send(record);
    } catch (error) {
        console.error('Error saving Place:', error);
        // Respond with a server error status and the error message
        return res.status(500).send(error.message);
    }
});