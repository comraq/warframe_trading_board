module.exports = [ "$scope",
                   "$state",
                   function($scope,
                            $state) {
  $scope.ctrl = this;
  this.scope = $scope

  this.isRootState = function isRootState() {
    return $state.is("root");
  };
}];
