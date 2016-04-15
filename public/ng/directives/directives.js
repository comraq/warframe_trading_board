exports.home = function() {
  return {
    restrict: "AE",
    controller: "homeController",
    templateUrl: "/ng/directives/home/homeView.html",
    scope: {
      user: "=user"
    }
  };
};

exports.mods = function() {
  return {
    restrict: "AE",
    controller: "modsController",
    templateUrl: "/ng/directives/mods/modsView.html",
    scope: {
      user: "=user"
    }
  };
};

exports.sellList = function() {
  return {
    restrict: "AE",
    controller: "sellListController",
    templateUrl: "/ng/directives/sellList/sellListView.html",
    scope: {
      user: "=user"
    }
  };
};

exports.customNavBar = function() {
  return {
    restrict: "AE",
    controller: "customNavBarController",
    templateUrl: "/ng/directives/customNavBar/customNavBarView.html",
    scope: {
      user: "=user"
    }
  };
};
