module.exports = [ "$scope", "$state", function($scope, $state) {
  $scope.ctrl = this;
  this.scope = $scope;

  var debug = false;
  var nextLevel = {};

  this.toNextState = function toNextState(selectedOption) {
    // Inherit all stateParams but the 'level' stateParam
    var nextParams = $state.params;
    nextParams[nextLevel.value.toLowerCase()] = selectedOption;
    delete nextParams.level;

    $state.go("root.mods." + nextLevel.value.toLowerCase(), nextParams);
  };

  function reloadDirective() {
    var stateParams = $state.params,
        catModelKey = { value: "Mods" };

    switch(stateParams.level) {
      case "Mode":
        catModelKey.value += ("." + stateParams.mode);
        nextLevel.value = "Type";
        break;

      case "Type":
        catModelKey.value += ("." + stateParams.mode + "."
                                  + stateParams.type);
        nextLevel.value = "Companion";
        break;

      case "Companion":
        catModelKey.value += ("." + stateParams.mode + "."
                                  + stateParams.type + "."
                                  + stateParams.companion);
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
      console.log(catModelKey);
    }

    $scope.options = $scope.catModel[catModelKey.value].children;

    if (debug) {
      console.log("catModelKey:")
      console.log(catModelKey);
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
