"use strict";

module.exports = async (req, res) => {
  try {
    const { clientIdentifier } = req.allParams();
    if (!clientIdentifier) {
      throw new Error("Falta Identificador de cliente");
    }
    let invoices = await sails.helpers.invoice.findpendingbyclientidentifier(
      clientIdentifier
    );
    res.json(invoices);
  } catch (error) {
    res.serverError(error);
  }
};
