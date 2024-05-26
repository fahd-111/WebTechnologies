const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send({ message: "Access denied. No token provided." });

    console.log(token, 'token')
    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), config.get("jwtPrivateKey"));
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({ message: "Invalid token." });
    }
}

module.exports = auth;