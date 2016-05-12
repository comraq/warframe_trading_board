import * as services from "./services";

(angular => {
  const warframeServices = angular.module("warframeServices", []);

  for (let name in services)
    warframeServices.service(name, services[name]);

})(window.angular);

module.exports = "warframeServices";
