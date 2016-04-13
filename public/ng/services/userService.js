var httpStatus = require("http-status");

module.exports = function($http) {
  var s = {};

  s.loadUser = function() {
    $http.
      get("/api/me").
      success(function(data) {
        s.user = data.user;
      }).
      error(function(data, httpStatus) {
        if (httpStatus === httpStatus.UNAUTHORIZED) {
          s.user = null;
        }
      });
  };

  s.loadUser();

  setInterval(s.loadUser, 60 * 60 * 1000);

  return s;
};
