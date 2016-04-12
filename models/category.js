var mongoose = require("mongoose");

var categoryObject = {
  _id: { type: String, required: true },
  parent: {
    type: String,
    ref: "Category"
  },
  ancestors: [{
    type: String,
    ref: "Category"
  }]
};

var schema = new mongoose.Schema(categoryObject);
module.exports = mongoose.model("Category", schema, "categories");
