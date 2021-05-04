const S = require("sequelize");
const db = require("./db");
const Passengers = require("./passengers");

class Pacakages extends S.Model {}

Pacakages.init(
    {
        flightNumber: {
            type: S.STRING,
            allowNull: false,
        },
        size: {
            type: S.ENUM,
            values: ["grande", "pequeño", "prenda"],
            allowNull: false,
        },
    },
    { sequelize: db, modelName: "packages" }
);

module.exports = Pacakages;
Pacakages.belongsTo(Passengers);
