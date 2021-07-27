/**
 * Client.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  datastore: "mysqlServer",
  attributes: {
    identifier: { type: "number" },
    name: {
      type: "string",
    },
    invoices: {
      collection: "invoice",
      via: "client",
    },
  },
};
