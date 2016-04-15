var httpStatus = require("http-status");

module.exports = [ "$http", "$q", function($http, $q) {
  return {
    getUserSession: function getUserSession() {
      var session = $q.defer();
      $http.get("/api/me")
         .success(function(res) {
           // API returns valid user data!
           session.resolve(res.user);
         })
         .error(function(res, httpStatus) {
           // Still resolve promise, with user as null
           session.resolve(null);
         });

      // Reload user session info from database every hour
      // setInterval(getUserSession, 60 * 60 * 1000);

      return session.promise;
    }  
  };
}];
