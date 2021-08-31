const moment = require("moment");
const findPendingByClientIdentifier = {
  friendlyName: "Find Pending Invoices By Client Identifier (Rut)",
  description: "Find Pending Invoices By Client Identifier (Rut)",
  inputs: {
    clientIdentifier: {
      type: "string",
      example: "",
      description: "Rut Cliente",
      required: true,
    },
  },
  fn: async ({ clientIdentifier }) => {
    try {
      let query = `
        Select Id_documento as id, Tipo as type, Numero as identifier, Fecha as expiresAt, Codigo as clientServiceIdentifier, Rut as clientIdentifier, Nombre as clientName, Neto, Iva, Total as amount, Total - Abonado As pendingAmount 
        From Documentos 
        Where Total > Abonado And Rut = '${clientIdentifier}' And Tipo = 1 
        Order By Fecha, Numero;`;
      let [invoices] = (
        (await Invoice.getDatastore().sendNativeQuery(query)) || {}
      ).recordsets;
      return invoices.map((invoiceItem) => ({
        ...invoiceItem,
        expiresAtLegible: moment(invoiceItem.expiresAt).format("DD/MM/YYYY"),
      }));
    } catch (error) {
      sails.log(error);
      return false;
    }
  },
};
module.exports = findPendingByClientIdentifier;
