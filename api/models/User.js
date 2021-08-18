/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: "mysqlServer",
  migrate: "safe",
  schema: true,
  attributes: {
    name: "string",
    username: "string",
    email: "string",
    password: {
      type: "string",
    },
  },
};
