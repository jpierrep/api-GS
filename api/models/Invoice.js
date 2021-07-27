/**
 * Invoice.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  //datastore: "sqlServer",
  migrate: "safe",
  //tableName: "Documentos",
  schema: false,
  attributes: {
    id: {
      type: "number",
      //columnName: "Id_documento",
      required: true,
      autoIncrement: true,
    },
    client: {
      model: "client",
    },
    /*     number: {
      type: "string",
      columnName: "Numero",
    }, */
    identifier: {
      type: "string",
      //columnName: "Codigo",
    },
    /*     rut: {
      type: "string",
      columnName: "Rut",
    }, */
    amount: {
      type: "number",
      //columnName: "Total",
    },
  },
};
