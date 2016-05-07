import fs from "fs";

export default (wagner, port) => {
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
