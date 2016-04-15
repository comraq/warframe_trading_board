var httpStatus = require("http-status");

module.exports = [ "$http", "$q", function($http, $q) {
  this.getUserSession = function getUserSession() {
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

    return session.promise;
  }
}];
