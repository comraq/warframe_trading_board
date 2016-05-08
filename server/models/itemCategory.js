import mongoose from "mongoose";

const itemCategoryObject = {
  _id: String,
  name: { type: String, required: true },
  parent: {
    type: String,
  },
  ancestors: [{
    type: String
  }]
};

const schema = new mongoose.Schema(itemCategoryObject);
schema.pre("validate", function(next) {
  // Manually set the _id based on the category name and ancestors
  let prefix;
  if (this.ancestors && this.ancestors.length > 0)
    prefix = this.ancestors.join(".");

  this._id = (prefix)? (prefix + "." + this.name) : this.name;

  next();
});

// Note: A copy of the actual hierarchy tree/objects stored in
//       the item-categories collection
const hierarchy = [
  {
    name: "Item",
    parent: null,
    ancestors: []
  },
  {
    name: "Mods",
    parent: "Item",
    ancestors: [ "Item" ]
  },
  {
    name: "Cooperative",
    parent: "Mods",
    ancestors: [ "Item", "Mods" ]
  },
  {
    name: "Warframe",
    parent: "Cooperative",
    ancestors: [ "Item", "Mods", "Cooperative" ]
  },
  {
    name: "Primary",
    parent: "Cooperative",
    ancestors: [ "Item", "Mods", "Cooperative" ]
  },
  {
    name: "Secondary",
    parent: "Cooperative",
    ancestors: [ "Item", "Mods", "Cooperative" ]
  },
  {
    name: "Melee",
    parent: "Cooperative",
    ancestors: [ "Item", "Mods", "Cooperative" ]
  },
  {
    name: "Companion",
    parent: "Cooperative",
    ancestors: [ "Item", "Mods", "Cooperative" ]
  },
  {
    name: "Sentinels",
    parent: "Companion",
    ancestors: [ "Item", "Mods", "Cooperative", "Companion" ]
  },
  {
    name: "Kubrow",
    parent: "Companion",
    ancestors: [ "Item", "Mods", "Cooperative", "Companion" ]
  },
  {
    name: "Kavats",
    parent: "Companion",
    ancestors: [ "Item", "Mods", "Cooperative", "Companion" ]
  },
  {
    name: "Archwing",
    parent: "Mods",
    ancestors: [ "Item", "Mods" ]
  },
  {
    name: "Primary",
    parent: "Archwing",
    ancestors: [ "Item", "Mods", "Archwing" ]
  },
  {
    name: "Melee",
    parent: "Archwing",
    ancestors: [ "Item", "Mods", "Archwing" ]
  },
  {
    name: "Conclave",
    parent: "Mods",
    ancestors: [ "Item", "Mods" ]
  },
  {
    name: "Primary",
    parent: "Conclave",
    ancestors: [ "Item", "Mods", "Conclave" ]
  },
  {
    name: "Secondary",
    parent: "Conclave",
    ancestors: [ "Item", "Mods", "Conclave" ]
  },
  {
    name: "Melee",
    parent: "Conclave",
    ancestors: [ "Item", "Mods", "Conclave" ]
  },
  {
    name: "Sortie Weapons",
    parent: "Item",
    ancestors: [ "Item" ]
  },
  {
    name: "Void Parts",
    parent: "Item",
    ancestors: [ "Item" ]
  },
  {
    name: "Keys",
    parent: "Item",
    ancestors: [ "Item" ]
  },
  {
    name: "Arcanes",
    parent: "Item",
    ancestors: [ "Item" ]
  }
];

export default mongoose.model("ItemCategory", schema, "item-categories");
export { hierarchy };

