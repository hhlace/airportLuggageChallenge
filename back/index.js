const express = require("express");
const app = express();
const db = require("./models/db");
const Passengers = require("./models/passengers");
const packages = require("./models/packages");
const sequelize = require("sequelize");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const session = require("express-session");
const routes = require("./routes");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: "henry" }));

app.use("/", routes);

db.sync()
    .then(() => {
        console.log("DB synched");
        app.listen(3000, () => console.log("listening on 3000"));
    })
    .catch(console.log);
