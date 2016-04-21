module.exports = [ "$scope",
                   "$state",
                   function($scope,
                            $state) {
  $scope.ctrl = this;
  this.scope = $scope

  this.rootState = function rootState() {
    return $state.current.name == "root";
  };
}];
