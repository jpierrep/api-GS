"use strict";
const moment = require("moment");
const XLSX = require("xlsx");
const uuid = require("uuid");
const { format, validate } = require("rut.js");
module.exports = async (req, res) => {
  try {
    let clients = await Client.find();
    let clientsVigilancia = await ClientVigilancia.find();
    clients = [...clients, ...clientsVigilancia];

    const saveAs = uuid();
    let fileUploaded = await new Promise((res, rej) => {
      req.file("file").upload(
        {
          saveAs,
          maxBytes: 30000000,
        },
        (err, files) => {
          if (err) {
            return rej(err);
          }
          return res(files[0]);
        }
      );
    });

    if (!fileUploaded) {
      throw new Error("Archivo no cargado");
    }

    //XLSX fileUploaded
    /* data is a node Buffer that can be passed to XLSX.read */
    const workbook = XLSX.readFile(`.tmp/uploads/${saveAs}`);
    const sheetNameList = workbook.SheetNames;
    let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]]);

    const dataProcess = await Promise.all(
      data
        .filter((item) => {
          try {
            if (item["CARGO/ABONO"] !== "A") {
              throw new Error("No es abono");
            }
            return true;
          } catch (error) {
            return false;
          }
        })
        .map(async (item) => {
          // Buscar cliente de abono
          let client;
          let [rut] = item["DESCRIPCIÓN MOVIMIENTO"].match(/[1-9]\w+/g) || [];
          let rutFinded;
          if (validate(rut)) {
            rutFinded = format(rut).replace(/\./g, "");
            client = clients.find((client) => client.identifier === rutFinded);
          }

          // Validar pagos existentes del mismo cliente y mismo monto
          let paymentNoticeFinded = await PaymentNotice.find({
            or: [
              {
                identifier: item["N° DOCUMENTO"].toString(),
              },
              {
                clientIdentifier: rutFinded,
                amount: item["MONTO"],
              },
            ],
          });
          if (paymentNoticeFinded && paymentNoticeFinded.length) {
            return undefined;
          }

          if (client) {
            try {
              client.invoices =
                await sails.helpers.invoice.findpendingbyclientidentifier(
                  rutFinded
                );
            } catch (error) {
              sails.log(error);
            }
          }

          return {
            identifier: item["N° DOCUMENTO"].toString(),
            client: client,
            description: item["DESCRIPCIÓN MOVIMIENTO"],
            amount: item["MONTO"],
            payedAtLegible: item["FECHA"],
            payedAt: moment(item["FECHA"], "DD/MM/YYYY").toDate().getTime(),
          };
        })
    );
    res.json(
      dataProcess.filter((item) => item).sort((a, b) => a.payedAt < b.payedAt)
    );
  } catch (error) {
    res.serverError(error);
  }
};
