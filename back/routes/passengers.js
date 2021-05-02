const express = require("express");
const Passenger = require("../models/passengers");
const router = express.Router();

router.post("/", (req, res) => {
    Passenger.findOrCreate({ where: req.body }).then(([passenger, created]) => {
        created ? res.status(201).send(passenger) : console.log("ya existe");
    });
});

module.exports = router;
