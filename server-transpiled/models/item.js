"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _itemCategory = require("./itemCategory");

var _itemCategory2 = _interopRequireDefault(_itemCategory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var itemObject = {
  user: {
    type: _mongoose2.default.Schema.Types.ObjectId,
    ref: "User"
  },
  name: { type: String, required: true },
  details: {
    type: String
    // TODO: Expand here?
  },
  price: { type: Number, required: true },
  transaction: {
    type: String,
    enum: transactionEnum,
    required: true
  },
  bidPrice: {
    start: { type: Number },
    current: { type: Number }
  },
  category: _itemCategory2.default.schema,
  expiry: { type: Date, required: true }
};

var transactionEnum = {
  values: ["Deal", "Auction"],
  message: "`transaction` Attribute Must Be Either 'Deal' or 'Auction'"
};

var options = {
  timestamps: true
};

var schema = new _mongoose2.default.Schema(itemObject, options);
schema.pre("save", function (next) {
  if (this.transaction == "Auction") {
    if (!this.bidPrice || !this.bidPrice.start) return next(new Error("Bid Price Not Set for Auction Item!"));else this.bidPrice.current = this.bidPrice.start;
  }

  next();
});

exports.default = _mongoose2.default.model("Item", schema, "items");