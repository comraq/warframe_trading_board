var express = require("express"),
    morgan = require("morgan"),
    wagner = require("wagner-core");

// Dependencies must be required before the others!
require('./dependencies')(wagner);
require("./models/models")(wagner);

var app = express(),
    port = process.argv[2] || process.env.PORT || 80;


app.use(morgan("dev"));
wagner.invoke(require('./auth'), { app: app });

app.use("/api", require("./routes/api")(wagner));
app.use("/", express.static(__dirname + "/public"));

app.listen(port);
console.log("Listening on port " + port + "...");
