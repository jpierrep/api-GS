/**
 * Company.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
  datastore: "sqlServer",
  migrate: "safe",
  tableName: "Empresa",
  attributes: {
    id: {
      type: "number",
      columnName: "Codigo",
      required: true,
    },
    name: {
      type: "string",
      columnName: "Titulo",
    },
    updatedAt: false,
    createdAt: false,
  },
};
