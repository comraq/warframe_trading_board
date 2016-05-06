#!/usr/bin/env node
"use strict";

var express = require("express"),
    morgan = require("morgan"),
    wagner = require("wagner-core");

var app = express(),
    port = process.argv[2] || process.env.PORT || 80;

wagner.constant("app", app);

// Dependencies must be required before the others!
require('./config/dependencies')(wagner, port);
require("./models")(wagner);

require("./auth")(wagner);

app.use(morgan("dev"));
app.use("/api", require("./routes")(wagner));

// For boostrap fonts
app.use("/fonts", express.static(__dirname + "/../node_modules/bootstrap/fonts"));
app.use("/", express.static(__dirname + "/../client"));

app.listen(port);
console.log("Listening on port " + port + "...");