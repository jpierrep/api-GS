/**
 * Invoice.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const moment = require("moment");
module.exports = {
  datastore: "mysqlServer",
  migrate: "alter",
  schema: true,
  attributes: {
    identifier: {
      type: "string",
    },
    amount: {
      type: "number",
    },
    client: {
      model: "client",
    },
    payedAt: {
      type: "number",
    },
    description: {
      type: "string",
    },
    log: {
      collection: "userlog",
      via: "paymentNotice",
    },
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
