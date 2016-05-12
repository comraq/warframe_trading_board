const userSessionService = [ "$http", "$q", ($http, $q) => {
  return {
    getUserSession: () => $http.get("/api/me")
      .then(res => res.data.user, // API returns valid user data!
            err => null) // Still resolve promise, with user as null
  };
}];

export default userSessionService;
