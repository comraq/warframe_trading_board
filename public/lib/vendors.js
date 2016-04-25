// External angular libraries
var angular = require("angular"),
    $ = require("jquery");

require("angular-ui-router");
require("angular-ui-bootstrap");
require("angular-breadcrumb");
require("./ng-scrollable/ng-scrollable.min.js");

// jQuery and Bootstrap
global.jQuery = global.$ = $;
require("bootstrap");
