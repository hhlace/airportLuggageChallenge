const express = require("express");
const Passenger = require("../models/passengers");
const S = require("sequelize");
const Op = S.Op;
const router = express.Router();

router.post("/", (req, res) => {
    Passenger.findOrCreate({ where: req.body }).then(([passenger, created]) => {
        created
            ? res.status(201).send(passenger)
            : res.send("El usuario ya existe");
    });
});

router.get("/search/:search", (req, res) => {
    Passenger.findAll({
        where: {
            [Op.or]: [
                { name: req.params.search },
                { lastName: req.params.search },
            ],
        },
    }).then((results) => res.send(results));
});

router.get("/:name", (req, res) => {
    Passenger.findAll({
        where: {
            name: req.params.name,
        },
    }).then((passengers) => res.send(passengers));
});

router.get("/:name/:lastName", (req, res) => {
    Passenger.findAll({
        where: {
            name: req.params.name,
            lastName: req.params.lastName,
        },
    }).then((passengers) => res.send(passengers));
});

module.exports = router;
