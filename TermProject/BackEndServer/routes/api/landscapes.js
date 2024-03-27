let express = require("express");
let router = express.Router();
let Landscape = require("../../models/Landscape");

router.get("/api/landscapes/:id", async (req, res) => {
    let game = await Landscape.findById(req.params.id);
    return res.send(game);
});
router.put("/api/landscapes/:id", async (req, res) => {
    let landscape = await Landscape.findById(req.params.id);
    landscape.title = req.body.title;
    landscape.type = req.body.type;
    landscape.genre = req.body.genre;
    await landscape.save();
    return res.send(landscape);
});
router.delete("/api/landscapes/:id", async (req, res) => {
    let game = await Landscape.findByIdAndDelete(req.params.id);
    return res.send(game);
});


router.post("/api/landscapes", async (req, res) => {
    let data = req.body;
    let record = new Landscape(data);

    // try {
        await record.save();
        return res.send(record);
    // } catch (error) {
    //     console.error('Error saving landscape:', error);
    //     // Respond with a server error status and the error message
    //     return res.status(500).send(error.message);
    // }
});
router.get("/api/landscapes", async function (req, res) {
    let games = await Landscape.find();
    return res.send(games);
});

module.exports = router;
