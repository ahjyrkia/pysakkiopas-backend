"use strict";

const models = require("./schemas");

module.exports.destroyTables = () => {
  return Promise.all(Object.keys(models).map(key => {
    if ({}.hasOwnProperty.call(models, key)) {
      return models[key].remove();
    }
  }));
};

// module.exports.createTables = () => {
//   return tables.syncForce();
//   // return tables.sync();
// };

module.exports.dropTables = () => {
  return Promise.all(Object.keys(models).map(key => {
    if ({}.hasOwnProperty.call(models, key)) {
      let mongoose = require("./db_connection");
      // duh doesn't work :/
      return mongoose.connection.db.dropDatabase();
      // return mongoose.connection.collections["items"].drop();
    }
  }))
};

module.exports.addTestData = () => Promise.all([
  models.Stop.create({
    code: "12345678",
    name: "testipysakki",
    dist: 50,
    codeShort: "1234",
    address: "testikatu 123"
  }),
])

module.exports.dump = () => {
  return Promise.all(Object.keys(models).map(key => {
    if ({}.hasOwnProperty.call(models, key)) {
      return models[key].find({});
    }
  }));
};

// module.exports.dropAndCreateTables = () => {
//   return module.exports.createTables()
//   .then(() => module.exports.addTestData())
//   .then(() => {
//     console.log("Dropped and created models with test data succesfully!");
//   })
//   .catch((err) => {
//     console.log("dropAndCreateTables produced an error!");
//     console.log(err);
//   });
// };

module.exports.resetTestData = () => {
  return module.exports.destroyTables()
  .then(() => module.exports.addTestData())
};
