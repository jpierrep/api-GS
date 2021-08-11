/**
 * Invoice.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const moment = require("moment");
module.exports = {
  datastore: "sqlServer",
  migrate: "safe",
  tableName: "Documentos",
  schema: true,
  attributes: {
    id: {
      type: "number",
      columnName: "Id_documento",
      required: true,
      autoIncrement: true,
    },
    /*     client: {
      model: "client",
      type: "number",
      columnName: "Codigo",
    }, */
    identifier: {
      type: "string",
      columnName: "Numero",
    },
    clientServiceIdentifier: {
      type: "string",
      columnName: "Codigo",
    },
    clientIdentifier: {
      type: "string",
      columnName: "Rut",
    },
    // 1 Factura
    type: {
      type: "number",
      columnName: "Tipo",
    },
    amount: {
      type: "number",
      columnName: "Total",
    },
    payedAmount: {
      type: "number",
      columnName: "Abonado",
    },
    expiresAt: {
      type: "string",
      columnName: "Fecha",
      columnType: "datetime",
    },
    /*     status: {
      type: "string",
    }, */
    updatedAt: false,
    createdAt: false,
  },
  customToJSON: function () {
    if (this.expiresAt) {
      this.expiresAtLegible = moment(this.expiresAt).format("DD/MM/YYYY");
    }
    return this;
  },
};
