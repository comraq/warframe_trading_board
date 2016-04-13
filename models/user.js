var mongoose = require("mongoose");

var userObject = {
  name: {
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: true
    }
  },
  profile: {
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    picture: {
      type: String,
      required: true,
      match: /^http:\/\//i
    }
  },
  data: {
    oauth: { type: String, required: true },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }]
  }
};

var schema = new mongoose.Schema(userObject);
module.exports = mongoose.model("User", schema, "users");
