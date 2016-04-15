var  mongoose = require('mongoose');

var itemCategoryObject = {
  _id: { type: String, required: true },
  parent: {
    type: String,
    ref: "ItemCategory"
  },
  ancestors: [{
    type: String,
    ref: "ItemCategory"
  }]
};

var schema = new mongoose.Schema(itemCategoryObject);
module.exports = mongoose.model("ItemCategory", schema, "item-categories");
