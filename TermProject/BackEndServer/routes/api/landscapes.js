let express = require("express");
let router = express.Router();
let Landscape = require("../../models/Landscape");
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

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
router.delete("/api/landscapes/:id", async (req, res) => {
    let landscape = await Landscape.findByIdAndDelete(req.params.id);
    return res.send(landscape);
});

// router.post("/api/landscapes", async (req, res) => {
//     let data = req.body;
//     let record = new Landscape({
//         name: data.name,
//         description: data.description,
//     });
//     console.log(req,'request')
//     try {
//         await record.save();
//         console.log(record,req.body)
//         return res.send(record);
//     } catch (error) {
//         console.error('Error saving landscape:', error);
//         // Respond with a server error status and the error message
//         return res.status(500).send(error.message);
//     }
// });

router.post("/api/landscapes", upload.single('image'), async (req, res) => {
    try {
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
    let landscapes = await Landscape.find();
    return res.send(landscapes);
});

module.exports = router;
