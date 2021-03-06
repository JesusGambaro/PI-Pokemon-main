//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const {conn} = require("./src/db.js");
const {Type} = require("./src/db");
const {default: axios} = require("axios");
// Syncing all the models at once.
conn.sync({force: true}).then(() => {
  (async () => {
    const petition = await Type.findAll({});
    if (!petition.length) {
      const {data} = await axios.get("https://pokeapi.co/api/v2/type");
      const allTypes = data.results.map((type) => type.name);
      for (const type_name of allTypes) {
        await Type.create({type_name});
      }
    }
  })();

  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
