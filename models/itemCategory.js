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

module.exports.hierarchy = {
  Item: {
    parent: null,
    ancestors: []
  },
  Mods: {
    parent: "Item",
    ancestors: [ "Item" ]
  },
  "Sortie Weapons": {
    parent: "Item",
    ancestors: [ "Item" ]
  },
  "Void Parts": {
    parent: "Item",
    ancestors: [ "Item" ]
  },
  Keys: {
    parent: "Item",
    ancestors: [ "Item" ]
  },
  Arcanes: {
    parent: "Item",
    ancestors: [ "Item" ]
  }
};
