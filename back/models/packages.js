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
            type: S.ARRAY(S.TEXT),
            allowNull: false,
        },
    },
    { sequelize: db, modelName: "packages" }
);

module.exports = Pacakages;
Pacakages.belongsTo(Passengers);
