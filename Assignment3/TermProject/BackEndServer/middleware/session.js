
const express = require("express");
const router = express.Router();

router.get("/api/session", (req, res) => {
    if (req.session && req.session.userId) {
        res.send({
            userId: req.session.userId,
            userRoles: req.session.userRoles,
            userData: req.session.userData,
        });
    } else {
        res.status(401).send({ message: "Unauthorized" });
    }
});

module.exports = router;