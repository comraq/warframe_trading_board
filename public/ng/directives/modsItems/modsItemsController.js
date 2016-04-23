module.exports = [
                   "$scope",
                   "$stateParams",
                   function($scope,
                            $stateParams) {
  $scope.ctrl = this;
  this.scope = $scope;

  var debug = false;

  if ($stateParams.level != "Companion" && $stateParams.type == "Companion")
    this.scope.atHierarchyLeaf = false; 
  else
    this.scope.atHierarchyLeaf = true;

  this.scope.tempListItems = [];
  for (var i = 0; i < 5; ++i)
    this.scope.tempListItems.push("tempListItem" + (i + 1));
}];
