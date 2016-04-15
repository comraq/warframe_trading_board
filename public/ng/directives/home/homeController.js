module.exports = [ "$scope", function($scope) {
  this.scope = $scope;

  this.scope.tempList = [];
  for (var i = 0; i < 100; ++i)
    this.scope.tempList.push("Temp List Item " + i);

}];
