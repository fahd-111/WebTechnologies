let express = require("express");
let router = express.Router();
let Landscape = require("../../models/Landscape");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const auth = require("../../middleware/authentication"); // Adjust the path to your auth middleware

router.get("/api/landscapes/:id", async (req, res) => {
    let landscape = await Landscape.findById(req.params.id);
    return res.send(landscape);
});
router.put("/api/landscapes/:id", async (req, res) => {
    let landscape = await Landscape.findById(req.params.id);
    landscape.name = req.body.name;
    landscape.description = req.body.description;
    landscape.imageURL = req.body.imageURL;
    await landscape.save();
    return res.send(landscape);
});

router.delete("/api/landscapes/:id", auth, async (req, res) => {

    try {
        let landscape = await Landscape.findById(req.params.id);
        if (!landscape) {
            return res.status(404).send({ message: "Landscape not found" });
        }

        await Landscape.findByIdAndDelete(req.params.id);

        return res.send(landscape);
    } catch (error) {
        return res.status(500).send({ message: "Failed to delete landscape", error: error.message });

    }
});

router.post("/api/landscapes",auth, upload.single('image'), async (req, res) => {
    try {

        if (req.session) {
            // console.log(req.session , "req.session")
            const { name, description } = req.body;
            const newLandscape = new Landscape({
                name,
                description,
                img: {
                    data: req.file.buffer,
                    contentType: req.file.mimetype
                }
            });
            await newLandscape.save();
            res.status(201).send(newLandscape);
        } else {
            res.status(401).send({ message: "Unauthorized" });
        }

    } catch (error) {
        res.status(400).send({ message: "Failed to create new landscape", error: error.message });
    }
});
router.get('/api/landscapes/image/:id', async (req, res) => {
    try {
        const landscape = await Landscape.findById(req.params.id);
        if (!landscape || !landscape.img) {
            return res.status(404).send('No image found');
        }
        res.contentType(landscape.img.contentType);
        res.send(landscape.img.data);
    } catch (error) {
        res.status(500).send({ message: "Failed to retrieve image", error: error.message });
    }
});

router.get("/api/landscapes", async function (req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        const landscapes = await Landscape.find().skip(skip).limit(limit);
        const totalLandscapes = await Landscape.countDocuments();

        return res.json({
            total: totalLandscapes,
            page,
            limit,
            landscapes
        });
    } catch (error) {
        res.status(500).send("Server error");
    }
});

module.exports = router;
