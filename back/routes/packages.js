const express = require("express");
const Pacakages = require("../models/packages");
const router = express.Router();

router.post("/", (req, res) => {
    Pacakages.create({
        flightNumber: req.body.flightNumber,
        size: req.body.size,
    })
        .then((package) => {
            package.setPassenger(req.body.passengerId);
        })
        .then((package) => res.status(201).send(package));
});

module.exports = router;
