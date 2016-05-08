import mongoose from "mongoose";
import ItemModel from "./item";
import UserModel from "./user";
import { default as ItemCategoryModel, hierarchy } from "./itemCategory";
ItemCategoryModel.hierarchy = hierarchy;

export default wagner => {
  wagner.invoke(Config => {
    const dbConfig = Config.warframeDB;
    let hostname = dbConfig.hostname || "localhost",
        port = dbConfig.port || 27017,
        user = dbConfig.user || undefined,
        password = dbConfig.password || undefined,
        dbName = dbConfig.dbName || "testDB";

    let userInfo = (user)? (user + ":" + password + "@") : "";
    let uri = "mongodb://" + userInfo
              + hostname + ":" + port + "/" + dbName;

    mongoose.connect(uri, err => {
      if (err)
        throw new Error(err);
    });
  })

  wagner.factory("db", Config => mongoose);

/*
 * TODO: Define mongoose schema models in separate .js files and
 *       require them as necessary inside models
 *
 *       Then, loop through each one and add them to wagner as a service
 */
  const models = {
    ItemCategory: ItemCategoryModel,
    Item: ItemModel,
    User: UserModel
  };

  // DRY, register factories/servies in a loop
  for (let modelName in models) {
    // Wagner Factory calls the functions asynchronously,
    // must use IIFE and closures to retain reference to the correct
    // modelName through each iteration of the loop
    wagner.factory(modelName, (name => () => models[name])(modelName));
  };

  return models;
};
