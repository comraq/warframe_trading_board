"use strict";

var mongoose = require("mongoose");

var userObject = {
  profile: {
    name: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true,
      match: /^https?:\/\//i
    }
  },
  data: {
    oauth: { type: String, required: true }
  }
};

var schema = new mongoose.Schema(userObject);
module.exports = mongoose.model("User", schema, "users");