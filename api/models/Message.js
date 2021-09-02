/**
 * Message.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

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
};
