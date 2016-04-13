var httpStatus = require("http-status");

module.exports = function($http) {
  var s = {};

  s.loadUser = function() {

    $http.get("/api/me")
         .success(function(res) {
           s.user = res.user;
         })
         .error(function(res, httpStatus) {
           if (httpStatus === httpStatus.UNAUTHORIZED)
             s.user = null;
         });
  };

  s.loadUser();

  // Reload user session info from database every hour
  setInterval(s.loadUser, 60 * 60 * 1000);

  return s;
};
