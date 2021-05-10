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
router.get("/:passengerId/:flightNumber", (req, res) => {
    Pacakages.findAll({
        where: {
            passengerId: req.params.passengerId,
            flightNumber: req.params.flightNumber,
        },
    }).then((packages) => res.send(packages));
});
router.delete("/:packageId", (req, res) => {
    Pacakages.findByPk(req.params.packageId)
        .then((pack) => pack.destroy())
        .then((r) => res.sendStatus(200));
});
router.delete("/:passengerId/:flightNumber", (req, res) => {
    Pacakages.destroy({
        where: {
            passengerId: req.params.passengerId,
            flightNumber: req.params.flightNumber,
        },
    }).then((r) => res.sendStatus(200));
});
router.get("/flights", (req, res) => {
    Pacakages.findAll().then((packs) => res.send(packs));
});
module.exports = router;
