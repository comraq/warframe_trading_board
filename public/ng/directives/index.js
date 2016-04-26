(function warframeDirectives(angular) {
  var warframeDirectives = angular.module("warframeDirectives", []);

  var directives = require("./directives");
  for (var name in directives)
    warframeDirectives.directive(name, directives[name]);

  var directiveControllers = require("./controllers");
  for (var name in directiveControllers)
    warframeDirectives.controller(name, directiveControllers[name]);

})(window.angular);

module.exports = "warframeDirectives";
