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
router.put("/:passengerId", (req, res) => {
    Passenger.findByPk(req.params.passengerId)
        .then((passenger) => {
            passenger.flights = req.body.flight;
            passenger.save();
            return passenger;
        })
        .then((updatedPassenger) => res.status(202).send(updatedPassenger));
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
router.get("/flight/:flightId", (req, res) => {
    Passenger.findAll({
        where: {
            flights: { [Op.contains]: [req.params.flightId] },
        },
    }).then((passengers) => res.send(passengers));
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
