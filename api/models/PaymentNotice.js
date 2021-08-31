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
  tableName: "DocPago",
  primaryKey: "id",
  attributes: {
    id: {
      type: "number",
      columnName: "Id_Pago",
      autoIncrement: true,
    },
    amount: {
      type: "number",
      columnName: "Monto",
    },
    clientIdentifier: {
      type: "string",
      columnName: "Rut",
      allowNull: true,
    },
    clientServiceIdentifier: {
      type: "string",
      columnName: "Codigo",
    },
    identifier: {
      type: "string",
      columnName: "Numero",
    },
    payedAt: {
      type: "string",
      columnName: "Fecha",
      columnType: "datetime",
    },
    company: {
      type: "number",
      columnName: "Empresa",
      defaultsTo: 0,
    },
    /*     description: {
      type: "string",
    }, */
    log: {
      collection: "userlog",
      via: "paymentNotice",
    },
    /*     reconciliations: {
      collection: "paymentreconciliation",
      via: "payment",
    }, */
    // Useless Data
    type: {
      type: "number",
      columnName: "Tipo",
      defaultsTo: 4,
    },
    expiresAt: {
      type: "string",
      columnName: "Vencimiento",
      columnType: "datetime",
    },
    Ubicacion: {
      type: "number",
      columnName: "Ubicacion",
      defaultsTo: 0,
    },
    /*     Banco: {
      type: "string",
      columnName: "Banco",
      allowNull: true
    },
    SucBco: {
      type: "string",
      columnName: "SucBco",
      allowNull: true
    },
    Plaza: {
      type: "string",
      columnName: "Plaza",
      allowNull: true
    }, */
    Saldo: {
      type: "number",
      columnName: "Saldo",
      defaultsTo: 0,
    },
    Pago: {
      type: "string",
      columnName: "Pago",
      columnType: "datetime",
      defaultsTo: "",
    },
    /*     CtaCte: {
      type: "string",
      columnName: "CtaCte",
      defaultsTo: "",
    }, */
    //
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
