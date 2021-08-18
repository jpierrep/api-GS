/**
 * Client.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const { format } = require("rut.js");

module.exports = {
  datastore: "sqlServer",
  migrate: "safe",
  tableName: "Clientes",
  attributes: {
    id: { type: "number", columnName: "IdCliente" },
    identifier: { type: "string", columnName: "Rut" },
    name: {
      type: "string",
      columnName: "Nombre",
    },
    enabled: {
      type: "boolean",
      columnName: "Vigencia",
    },
    /*     invoices: {
      collection: "invoice",
      via: "client",
    }, */
    updatedAt: false,
    createdAt: false,
  },
  customToJSON: function () {
    this.identifierFormatted = format(this.identifier);
    return this;
  },
};
