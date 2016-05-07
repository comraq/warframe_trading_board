import express from "express";
import morgan from "morgan";
import wagner from "wagner-core";

const app = express();
let port = process.argv[2] || process.env.PORT || 80;

wagner.constant("app", app);

// Dependencies must be required before the others!
import setupDependencies from "./config/dependencies";
setupDependencies(wagner, port);

require("./models")(wagner);

require("./auth")(wagner);

app.use(morgan("dev"));
app.use("/api", require("./routes")(wagner));

// For boostrap fonts
app.use("/fonts", express.static(__dirname
                                 + "/../node_modules/bootstrap/fonts"));
app.use("/", express.static(__dirname + "/../client"));

app.listen(port);
console.log("Listening on port " + port + "...");
