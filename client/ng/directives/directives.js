const root = () => {
  return {
    restrict: "AE",
    controller: "rootController",
    templateUrl: "/ng/directives/root/rootView.html",
    scope: {
      user: "=user",
      children: "=children"
    }
  };
};

const customNavBar = () => {
  return {
    restrict: "AE",
    controller: "customNavBarController",
    templateUrl: "/ng/directives/customNavBar/customNavBarView.html",
    scope: {
      user: "=user",
      children: "=children"
    }
  };
};

const home = () => {
  return {
    restrict: "AE",
    controller: "homeController",
    templateUrl: "/ng/directives/home/homeView.html",
    scope: {
      user: "=user",
      children: "=children"
    }
  };
};

const modsItems = () => {
  return {
    restrict: "AE",
    controller: "modsItemsController",
    templateUrl: "/ng/directives/modsItems/modsItemsView.html",
    scope: {
      user: "=user",
      children: "=children"
    }
  };
};

const modsHierarchy = () => {
  return {
    restrict: "AE",
    controller: "modsHierarchyController",
    templateUrl: "/ng/directives/modsHierarchy/modsHierarchyView.html",
    scope: {
      user: "=user",
      children: "=children",
      getModeLabel: "=getmodelabel",
      getTypeLabel: "=gettypelabel",
      getCompanionLabel: "=getcompanionlabel"
    }
  };
};

const logIn = () => {
  return {
    restrict: "AE",
    controller: "logInController",
    templateUrl: "/ng/directives/logIn/logInView.html"
  };
}

const newPost = () => {
  return {
    restrict: "AE",
    controller: "newPostController",
    templateUrl: "/ng/directives/newPost/newPostView.html",
    scope: {
      newItem: "=item",
      cancel: "=cancel"
    }
  };
};

export {
  root,
  customNavBar,
  home,
  modsItems,
  modsHierarchy,
  logIn,
  newPost,
};
