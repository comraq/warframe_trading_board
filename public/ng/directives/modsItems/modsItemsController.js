module.exports = [
                   "$scope",
                   "$stateParams",
                   function($scope,
                            $stateParams) {
  $scope.ctrl = this;
  this.scope = $scope;

  var debug = false;

  this.scope.tempListItems = [];
  for (var i = 0; i < 5; ++i)
    this.scope.tempListItems.push("tempListItem" + (i + 1));
}];
