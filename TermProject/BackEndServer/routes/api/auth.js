let express = require("express");
let router = express.Router();
const User = require("../../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");

router.post("/api/auth/login", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ message: "User Not Found!!" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send({ message: "Invalid Password" });
        }

        const token = jwt.sign(
            { _id: user._id, roles: user.roles, name: user.name, email: user.email },
            config.get("jwtPrivateKey"),
            { expiresIn: "1h" }
        );
        req.session.userId = user._id;
        req.session.userRoles = user.roles;
        req.session.userData = {
            name: user.name,
            email: user.email
        };
        req.session.save();
        console.log(req.session, "req.session")
        res.cookie("AccessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        const session = req.session;
        return res.status(202).send({session, token, message: "Logged in successfully" });
    } catch (error) {
        console.error("Error during login:", error); // Log any errors for troubleshooting
        return res.status(500).send({ message: "Internal server error", error: error.message });
    }
});

router.post("/api/auth/register", async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ message: "User already registered." });
        }

        user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = jwt.sign(
            { _id: user._id, roles: user.roles, name: user.name, email: user.email },
            config.get("jwtPrivateKey"),
            { expiresIn: "1h" }
        );

        console.log("Generated Token:", token); // Log the token to verify it's generated correctly

        res.cookie("AccessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(201).send({ token });
    } catch (error) {
        console.error("Error during registration:", error); // Log any errors for troubleshooting
        return res.status(500).send({ message: "Internal server error", error: error.message });
    }
});
module.exports = router;