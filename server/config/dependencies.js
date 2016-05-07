import fs from "fs";

const setupDependencies = (wagner, port) => {
  wagner.factory("Config", () => {
    let conf = JSON.parse(
                 fs.readFileSync(__dirname + "/../../config.json")
                   .toString()
               );
    conf.server.port = port;
    conf.server.authority = conf.server.host + ":" + port;
    return conf;
  });
};

export default setupDependencies;
