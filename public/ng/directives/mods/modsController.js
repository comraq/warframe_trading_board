module.exports = [ "$scope", function($scope) {
  $scope.ctrl = this;
  this.scope = $scope;

  this.scope.modes = this.scope.catModel.Mods.children;
}];
