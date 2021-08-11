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
  schema: true,
  tableName: "DocPago",
  attributes: {
    id: {
      type: "number",
      columnName: "Id_Pago",
      required: true,
      autoIncrement: true,
    },
    amount: {
      type: "number",
      columnName: "Monto",
    },
    clientIdentifier: {
      type: "string",
      columnName: "Rut",
    },
    client: {
      type: "string",
      columnName: "Codigo",
    },
    code: {
      type: "string",
      columnName: "Numero",
    },
    payedAt: {
      type: "string",
      columnName: "Fecha",
      columnType: "datetime",
    },
    /*     description: {
      type: "string",
    }, */
    log: {
      collection: "userlog",
      via: "paymentNotice",
    },
    updatedAt: false,
    createdAt: false,
  },
  customToJSON: function () {
    if (this.payedAt) {
      this.payedAtLegible = moment(this.payedAt).format("DD/MM/YYYY");
    }
    return this;
  },
  afterCreate: function (created, next) {
    try {
      sails.helpers.paymentnotice
        .customaftercreate(created)
        .then((results) => {
          next();
        })
        .catch((err) => {
          sails.log(err);
          next();
        });
    } catch (error) {
      sails.log(error);
    }
  },
};
