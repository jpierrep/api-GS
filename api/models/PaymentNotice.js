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
  },
  customToJSON: function () {
    if (this.payedAt) {
      this.payedAtLegible = moment(this.payedAt).format("DD/MM/YYYY");
    }
    return this;
  },
};
