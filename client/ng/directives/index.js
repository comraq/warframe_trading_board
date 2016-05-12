import * as directiveControllers from "./controllers";
import * as directives from "./directives";

(angular => {
  const warframeDirectives = angular.module("warframeDirectives", []);

  for (let name in directives)
    warframeDirectives.directive(name, directives[name]);

  for (let name in directiveControllers)
    warframeDirectives.controller(name, directiveControllers[name]);

})(window.angular);

export default "warframeDirectives";
