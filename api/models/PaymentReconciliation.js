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
  tableName: "Enlaze",
  attributes: {
    id: {
      type: "number",
      columnName: "Id",
      required: true,
      autoIncrement: true,
    },
    payment: {
      model: "PaymentNotice",
      columnName: "Pago",
    },
    invoice: {
      model: "Invoice",
      columnName: "Documento",
    },
    amount: {
      type: "number",
      columnName: "Monto",
    },
    valid: {
      type: "boolean",
      columnName: "Vigente",
    },
    paymentType: {
      type: "number",
      columnName: "Tipo_Pago",
    },
    updatedAt: false,
    createdAt: false,
  },
};
