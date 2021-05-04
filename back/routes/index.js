const express = require("express");
const router = express.Router();
const S = require("sequelize");
const Packages = require("./packages");
const Passenger = require("./passengers");

router.use("/packages", Packages);
router.use("/passengers", Passenger);

/* router.get("/*", (req, res) => {
    res.sendFile(__dirname + "/public/" + "index.html");
}); */

module.exports = router;
