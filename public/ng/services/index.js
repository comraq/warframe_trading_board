(function warframeServices(angular) {
  var warframeServices = angular.module("warframeServices", []);

  var services = require("./services");
  for (var name in services)
    warframeServices.service(name, services[name]);

})(window.angular);

module.exports = "warframeServices";
