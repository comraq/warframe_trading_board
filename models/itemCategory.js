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

// Note: children array not stored in database! Only for UI searching
module.exports.hierarchy = {
  Item: {
    parent: null,
    ancestors: [],
    children: [ "Mods", "Sortie Weapons", "Void Parts", "Keys", "Arcanes" ]
  },
  Mods: {
    parent: "Item",
    ancestors: [ "Item" ],
    children: [ "Cooperative", "Archwing", "Conclave" ]
  },
  "Mods.Cooperative": {
    parent: "Mods",
    ancestors: [ "Item", "Mods" ],
    children: [ "Warframe", "Primary", "Secondary", "Melee", "Companion" ]
  },
  "Mods.Cooperative.Warframe": {
    parent: "Mods.Cooperative",
    ancestors: [ "Item", "Mods", "Mods.Cooperative" ],
    children: null
  },
  "Mods.Cooperative.Primary": {
    parent: "Mods.Cooperative",
    ancestors: [ "Item", "Mods", "Mods.Cooperative" ],
    children: null
  },
  "Mods.Cooperative.Secondary": {
    parent: "Mods.Cooperative",
    ancestors: [ "Item", "Mods", "Mods.Cooperative" ],
    children: null
  },
  "Mods.Cooperative.Melee": {
    parent: "Mods.Cooperative",
    ancestors: [ "Item", "Mods", "Mods.Cooperative" ],
    children: null
  },
  "Mods.Cooperative.Companion": {
    parent: "Mods.Cooperative",
    ancestors: [ "Item", "Mods", "Mods.Cooperative" ],
    children: [ "Sentinels", "Kubrow", "Kavats" ]
  },
  "Mods.Cooperative.Companion.Sentinels": {
    parent: "Mods.Cooperative.Companion",
    ancestors: [ "Item", "Mods", "Mods.Cooperative",
                 "Mods.Cooperative.Companion" ],
    children: null
  },
  "Mods.Cooperative.Companion.Kubrow": {
    parent: "Mods.Cooperative.Companion",
    ancestors: [ "Item", "Mods", "Mods.Cooperative",
                 "Mods.Cooperative.Companion" ],
    children: null
  },
  "Mods.Cooperative.Companion.Kavats": {
    parent: "Mods.Cooperative.Companion",
    ancestors: [ "Item", "Mods", "Mods.Cooperative",
                 "Mods.Cooperative.Companion" ],
    children: null
  },
  "Mods.Archwing": {
    parent: "Mods",
    ancestors: [ "Item", "Mods" ],
    children: [ "Primary", "Melee" ]
  },
  "Mods.Archwing.Primary": {
    parent: "Mods.Archwing",
    ancestors: [ "Item", "Mods", "Mods.Archwing" ],
    children: null
  },
  "Mods.Archwing.Melee": {
    parent: "Mods.Archwing",
    ancestors: [ "Item", "Mods", "Mods.Archwing" ],
    children: null
  },
  "Mods.Conclave": {
    parent: "Mods",
    ancestors: [ "Item", "Mods" ],
    children: [ "Primary", "Secondary", "Melee" ]
  },
  "Mods.Conclave.Primary": {
    parent: "Mods.Conclave",
    ancestors: [ "Item", "Mods", "Mods.Conclave" ],
    children: null
  },
  "Mods.Conclave.Secondary": {
    parent: "Mods.Conclave",
    ancestors: [ "Item", "Mods", "Mods.Conclave" ],
    children: null
  },
  "Mods.Conclave.Melee": {
    parent: "Mods.Conclave",
    ancestors: [ "Item", "Mods", "Mods.Conclave" ],
    children: null
  },
  "Sortie Weapons": {
    parent: "Item",
    ancestors: [ "Item" ],
    children: null
  },
  "Void Parts": {
    parent: "Item",
    ancestors: [ "Item" ],
    children: null
  },
  Keys: {
    parent: "Item",
    ancestors: [ "Item" ],
    children: null
  },
  Arcanes: {
    parent: "Item",
    ancestors: [ "Item" ],
    children: null
  }
};
