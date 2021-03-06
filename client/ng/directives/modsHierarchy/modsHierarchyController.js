const modsHierarchyController = [ "$scope", "$state",
                                  function($scope, $state) {
  $scope.ctrl = this;
  this.scope = $scope;

  let debug = false;
  let nextLevel = {};

  this.toNextState = selectedOption => {
    // Inherit all stateParams but the 'level' stateParam
    let nextParams = $state.params;
    nextParams[nextLevel.value.toLowerCase()] = selectedOption;
    delete nextParams.level;

    $state.go("root.mods." + nextLevel.value.toLowerCase(), nextParams);
  };

  const reloadDirective = () => {
    let stateParams = $state.params;

    switch(stateParams.level) {
      case "Mode":
        nextLevel.value = "Type";
        break;

      case "Type":
        nextLevel.value = "Companion";
        break;

      case "Companion":
        nextLevel.value = "placeholderstate";
        break;

      default:
        nextLevel.value = "Mode";
    }

    if (debug) {
      console.log("inside reloadDirective");
      console.log("current state: " + $state.current.name);
      console.log($scope);
    }


    if (debug) {
      console.log("stateParams:");
      console.log(stateParams);
    }

    $scope.options = $scope.children;

    if (debug) {
      console.log("nextLevel:");
      console.log(nextLevel);
      console.log("state:");
      console.log($state);
      console.log("scope:");
      console.log($scope);
      console.log("\n\n\n");
    }
  }

  reloadDirective();
}];

export default modsHierarchyController;
