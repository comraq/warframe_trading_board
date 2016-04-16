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

exports.logIn = function() {
  return {
    restrict: "AE",
    controller: "logInController",
    templateUrl: "/ng/directives/logIn/logInView.html"
  };
}

exports.newPost = function() {
  return {
    restrict: "AE",
    controller: "newPostController",
    templateUrl: "/ng/directives/newPost/newPostView.html",
    scope: {
      newItem: "=item",
      modal: "=modal"
    }
  };
};
