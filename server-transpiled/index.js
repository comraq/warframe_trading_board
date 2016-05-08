"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _morgan = require("morgan");

var _morgan2 = _interopRequireDefault(_morgan);

var _wagnerCore = require("wagner-core");

var _wagnerCore2 = _interopRequireDefault(_wagnerCore);

var _dependencies = require("./config/dependencies");

var _dependencies2 = _interopRequireDefault(_dependencies);

var _models = require("./models");

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = process.argv[2] || process.env.PORT || 80;

_wagnerCore2.default.constant("app", app);

// Dependencies must be required before the others!

(0, _dependencies2.default)(_wagnerCore2.default, port);

//require("./models")(wagner);

(0, _models2.default)(_wagnerCore2.default);

require("./auth")(_wagnerCore2.default);

app.use((0, _morgan2.default)("dev"));
app.use("/api", require("./routes")(_wagnerCore2.default));

// For boostrap fonts
app.use("/fonts", _express2.default.static(__dirname + "/../node_modules/bootstrap/fonts"));
app.use("/", _express2.default.static(__dirname + "/../client"));

app.listen(port);
console.log("Listening on port " + port + "...");