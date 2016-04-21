module.exports = [ "$scope", "$state", function($scope, $state) {
  $scope.ctrl = this;
  this.scope = $scope;

  var debug = false;

  var nextLevel = {};

  this.toNextState = function toNextState(selectedOption) {
    var currState = $state.current.name,
        // By default, next state will also inherit current stateParams, no
        // need to explicitly pass them
        nextParams = {};

    nextParams[nextLevel.value.toLowerCase()] = selectedOption;

    $state.go(currState + "." + nextLevel.value.toLowerCase(), nextParams);
  };

  this.scope.$on("$stateChangeSuccess",
                 function modsDirectiveStateChangeSuccess() {
    reloadDirective();
  });

  function reloadDirective() {
    var stateParams = $state.params,
        catModelKey = { value: "Mods" };

    $scope.notActiveState = false;
    switch(stateParams.level) {
      case "Mode":
        if (!$scope.getModeLabel) {
          $scope.notActiveState = true;
          break;
        }

        catModelKey.value += ("." + stateParams.mode);
        nextLevel.value = "Type";
        break;

      case "Type":
        if (!$scope.getTypeLabel) {
          $scope.notActiveState = true;
          break;
        }

        catModelKey.value += ("." + stateParams.mode + "."
                                  + stateParams.type);
        nextLevel.value = "Companion";
        break;

      case "Companion":
        if (!$scope.getCompanionLabel) {
          $scope.notActiveState = true;
          break;
        }

        catModelKey.value += ("." + stateParams.mode + "."
                                  + stateParams.type + "."
                                  + stateParams.companion);
        nextLevel.value = "placeholderstate";
        break;

      default:
        if ($scope.getModeLabel || $scope.getTypeLabel)
          $scope.notActiveState = true;

        nextLevel.value = "Mode";
    }

    if (debug) {
      console.log("inside reloadDirective");
      console.log("current state: " + $state.current.name);
    }

    if ($scope.notActiveState) {
      if (debug) {
        console.log("notActiveState: true");
        console.log("\n\n\n");
      }
      return;
    }

    if (debug) {
      console.log("notActiveState: false");
      console.log("stateParams:");
      console.log(stateParams);
      console.log(catModelKey);
    }

    $scope.options = $scope.catModel[catModelKey.value].children;
    if (!$scope.options) {
      $scope.tempListItems = [];
      for (var i = 0; i < 5; ++i)
        $scope.tempListItems.push("tempListItem" + (i + 1));
    }

    if (debug) {
      console.log("catModelKey:")
      console.log(catModelKey);
      console.log("nextLevel:");
      console.log(nextLevel);
      console.log("\n\n\n");
    }
  }

  reloadDirective();
}];
