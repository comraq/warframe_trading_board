// External dependencies included in client/vendors/scripts.js !

var app = angular.module("warframeTrade", [
                                            "ngAnimate",
                                            "ngTouch",
                                            "ui.bootstrap",
                                            "ui.router",
                                            "ncy-angular-breadcrumb",
                                            "ngScrollable",
                                            require("./directives"),
                                            require("./services")
                                          ]);
var debug = false;

app.config([ "$stateProvider",
             "$urlRouterProvider",
             function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .otherwise("/home");

  $stateProvider
    .state("root", {
      url: "/home",
      views: {
        "": { template: "<root></root>" },
        "navbar@root": {
          template: "<custom-nav-bar" + " user='userSession'"
                                      + "></custom-nav-bar>",
          controller: [ "$scope", "userSession",
                        function($scope, userSession) {
            $scope.userSession = userSession;
          }]
        },
        "body@root": {
          template: "<home" + " user='userSession'"
                            + " children='children'"
                            + "></home>",
          controller: [
                        "$scope",
                        "userSession",
                        "children",
                        function($scope,
                                 userSession,
                                 children) {
            $scope.userSession = userSession;
            $scope.children = children;
          }]
        }
      },
      resolve: {
        userSession: [ "userSessionService",
                       function(userSessionService) {
          return userSessionService.getUserSession();
        }],
        children: [ "itemCategoryService",
                    function(itemCategoryService, $state) {
          return itemCategoryService.getChildren("/Item");
        }]
      },
      ncyBreadcrumb: {
        label: "Home"
      }
    })
    .state("root.mods", {
      url: "/mods",
      views: {
        "breadcrumb": { template: "<div ncy-breadcrumb></div>" },
        "body": {
          templateUrl: "/ng/templates/root-mods-body-template.html"
        },
        "hierarchy@root.mods": {
          template: "<mods-hierarchy" + " user='userSession'"
                                      + " children='children'"
                                      + "></mods-hierarchy>",
          controller: [
                        "$scope",
                        "userSession",
                        "children",
                        function($scope,
                                 userSession,
                                 children) {
            $scope.userSession = userSession;
            $scope.children = children;
          }]
        }
      },
      resolve: {
        children: [ "itemCategoryService",
                    function(itemCategoryService) {
          return itemCategoryService.getChildren("/Item/Mods");
        }]
      },
      ncyBreadcrumb: {
        label: "Mods"
      }
    })
    .state("root.mods.mode", {
      url: "/:mode",
      params: {
        level: "Mode"
      },
      views: {
        "hierarchy": {
          template: "<mods-hierarchy" + " user='userSession'"
                                      + " children='children'"
                                      + " getmodelabel='getModeLabel'"
                                      + "></mods-hierarchy>",
          controller: [
                        "$scope",
                        "$stateParams",
                        "userSession",
                        "children",
                        function($scope,
                                 $stateParams,
                                 userSession,
                                 children) {
            $scope.userSession = userSession;
            $scope.children = children;
 
            $scope.getModeLabel = function() {
              return $stateParams.mode;
            };
          }]
        },
        "items": {
          controller: [ "$scope", function($scope) {
            // Must explicitly set breadcrumb ignore for multiview scopes
            $scope.ncyBreadcrumbIgnore = true;
          }]
        }
      },
      resolve: {
        children: [ "itemCategoryService", "$stateParams",
                    function(itemCategoryService, $stateParams) {
          return itemCategoryService
                   .getChildren("/Item/Mods/" + $stateParams.mode);
        }]
      },
      ncyBreadcrumb: {
        label: "{{ getModeLabel() }}"
      }
    })
    .state("root.mods.type", {
      url: "/:mode/:type",
      params: {
        level: "Type"
      },
      views: {
        "hierarchy": {
          template: "<mods-hierarchy" + " user='userSession'"
                                      + " children='children'"
                                      + " getmodelabel='getModeLabel'"
                                      + " gettypelabel='getTypeLabel'"
                                      + "></mods-hierarchy>",
          controller: [
                        "$scope",
                        "$stateParams",
                        "userSession",
                        "children",
                        function($scope,
                                 $stateParams,
                                 userSession,
                                 children) {
            $scope.userSession = userSession;
            $scope.children = children;

            $scope.getModeLabel = function() {
              return $stateParams.mode;
            };

            $scope.getTypeLabel = function() {
              return $stateParams.type;
            };
          }]
        },
        "items": {
          template: "<mods-items"
                      + " user='userSession'"
                      + " children='children'"
                      + "></mods-items>",
          controller: [
                        "$scope",
                        "userSession",
                        "children",
                        function($scope,
                                 userSession,
                                 children) {
            $scope.userSession = userSession;
            $scope.children = children;

            // Must explicitly set breadcrumb ignore for multiview scopes
            $scope.ncyBreadcrumbIgnore = true;
          }]
        }
      },
      resolve: {
        children: [ "itemCategoryService", "$stateParams",
                    function(itemCategoryService, $stateParams) {
          return itemCategoryService
                   .getChildren("/Item/Mods/" + $stateParams.mode
                                        + "/" + $stateParams.type);
        }]
      },
      ncyBreadcrumb: {
        parent: "root.mods.mode",
        label: "{{ getTypeLabel() }}"
      }
    })
    .state("root.mods.companion", {
      url: "/:mode/:type/:companion",
      params: {
        level: "Companion"
      },
      views: {
        "hierarchy": {
          template: "<mods-hierarchy"
                      + " user='userSession'"
                      + " children='children'"
                      + " getmodelabel='getModeLabel'"
                      + " gettypelabel='getTypeLabel'"
                      + " getcompanionlabel='getCompanionLabel'"
                      + "></mods-hierarchy>",
          controller: [
                        "$scope",
                        "$stateParams",
                        "userSession",
                        "children",
                        function($scope,
                                 $stateParams,
                                 userSession,
                                 children) {
            $scope.userSession = userSession;
            $scope.children = children;
 
            $scope.getModeLabel = function() {
              return $stateParams.mode;
            };

            $scope.getTypeLabel = function() {
              return $stateParams.type;
            };

            $scope.getCompanionLabel = function() {
              return $stateParams.companion;
            };
          }]
        },
        "items": {
          template: "<mods-items"
                      + " user='userSession'"
                      + " children='children'"
                      + "></mods-items>",
          controller: [
                        "$scope",
                        "userSession",
                        function($scope,
                                 userSession,
                                 children) {
            $scope.userSession = userSession;
            $scope.children = children;

            // Must explicitly set breadcrumb ignore for multiview scopes
            $scope.ncyBreadcrumbIgnore = true;
          }]
        }
      },
      resolve: {
        children: [ "itemCategoryService", "$stateParams",
                    function(itemCategoryService, $stateParams) {
          return itemCategoryService
                   .getChildren("/Item/Mods/" + $stateParams.mode
                                        + "/" + $stateParams.type
                                        + "/" + $stateParams.companion);
        }]
      },
      ncyBreadcrumb: {
        parent: "root.mods.type",
        label: "{{ getCompanionLabel() }}"
      }
    })
}]);

app.run([
          "$rootScope",
          "$state",
          "$stateParams",
          "$urlRouter",
          function ($rootScope, $state, $stateParams, $urlRouter) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  $rootScope.$on("$stateChangeStart", function(evt, toState, toParams,
                                               fromState, fromParams) {
    if (debug) {
      console.log("state change start:");
      console.log("from state:");
      console.log(fromState);
      console.log(fromParams);
      console.log("to state:");
      console.log(toState);
      console.log(toParams);
      console.log("\n\n\n");
    }
  });
}]);
