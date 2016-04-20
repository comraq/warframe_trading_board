module.exports = [
                   "$scope",
                   "$stateParams",
                   function($scope, $stateParams) {
  $scope.ctrl = this;
  this.scope = $scope;

  console.log("modsModeController, $stateParams:");
  console.log($stateParams);
  console.log("modsModeController, $scope:");
  console.log(this.scope);

  var category = "Mods." + $stateParams.mode;
  this.scope.types = this.scope.catModel[category].children;
}];

