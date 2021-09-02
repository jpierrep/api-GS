/**
 * Message.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
const moment = require("moment");
module.exports = {
  datastore: "mysqlServer",
  migrate: "safe",
  attributes: {
    text: "string",
    room: "string",
    createdBy: {
      model: "user",
    },
    attachmentArchives: {
      collection: "archive",
      via: "message",
    },
  },
  customToJSON: function () {
    if (this.createdAt) {
      this.createdAtLegible = moment(this.createdAt).format("DD/MM/YYYY");
    }
    return this;
  },
};
