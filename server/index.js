import express from "express";
import morgan from "morgan";
import wagner from "wagner-core";

import setupDependencies from "./config/dependencies";
import setupModels from "./models";
import setupAuth from "./auth";
import setupRoutes from "./routes";

const app = express();
let port = process.argv[2] || process.env.PORT || 80;

wagner.constant("app", app);

// Dependencies must be setup before the others!
setupDependencies(wagner, port);
setupModels(wagner);
setupAuth(wagner);

app.use(morgan("dev"));
app.use("/api", setupRoutes(wagner));

// For boostrap fonts
app.use("/fonts", express.static(__dirname
                                 + "/../node_modules/bootstrap/fonts"));
app.use("/", express.static(__dirname + "/../client"));

app.listen(port);
console.log("Listening on port " + port + "...");
