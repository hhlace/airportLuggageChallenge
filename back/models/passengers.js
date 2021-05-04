const S = require("sequelize");
const db = require("./db");

class Passenger extends S.Model {}

Passenger.init(
    {
        name: {
            type: S.STRING,
            allowNull: false,
        },
        lastName: {
            type: S.STRING,
            allowNull: false,
        },
        flights: {
            type: S.ARRAY(S.STRING),
        },
    },
    { sequelize: db, modelName: "passenger" }
);

module.exports = Passenger;
