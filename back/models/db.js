const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/airportLuggage', {logging: false});

module.exports = db;