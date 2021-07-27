"use strict";
const moment = require("moment");
const XLSX = require("xlsx");
const uuid = require("uuid");
const Rut = require("rutjs");
module.exports = async (req, res) => {
  try {
    let { fileData } = req.allParams();

    let clients = await Client.find().populate("invoices", {
      where: { status: "pending" },
    });

    const dirname = ".tmp/uploads/";
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

    let clientsCreated = await Client.createEach(
      data
        .filter((item) => {
          const rut = new Rut(
            item["DESCRIPCIÓN MOVIMIENTO"].replace(/[^\d-]/g, "")
          );

          if (!rut.isValid) {
            return false;
          }
          const rutCleaned = rut.getCleanRut();
          let client = clients.find(
            (client) => client.identifier === rutCleaned
          );

          if (client) {
            return false;
          }

          if (item["CARGO/ABONO"] !== "A") {
            return false;
          }

          return true;
        })
        .reduce((clientsToCreate, item) => {
          const rut = new Rut(
            item["DESCRIPCIÓN MOVIMIENTO"].replace(/[^\d-]/g, "")
          );

          let client;
          const rutCleaned = rut.getCleanRut();
          client = clientsToCreate.find(
            (client) => client.identifier === rutCleaned
          );
          if (!client) {
            clientsToCreate.push({
              identifier: rutCleaned,
              name: item["DESCRIPCIÓN MOVIMIENTO"].replace(/[0-9]/g, "").trim(),
            });
          }
          return clientsToCreate;
        }, [])
    ).fetch();

    clients = [...clients, ...clientsCreated];

    const dataProcess = await Promise.all(
      data
        .filter((item) => item["CARGO/ABONO"] === "A")
        .map(async (item) => {
          const rut = new Rut(
            item["DESCRIPCIÓN MOVIMIENTO"].replace(/[^\d-]/g, "")
          );

          let client;
          if (rut.isValid) {
            const rutCleaned = rut.getCleanRut();
            client = clients.find(
              (client) => client.identifier === parseInt(rutCleaned, 10)
            );
          }

          return {
            id: uuid(),
            client: client,
            description: item["DESCRIPCIÓN MOVIMIENTO"],
            amount: item["MONTO"],
            payedAtLegible: item["FECHA"],
            payedAt: moment(item["FECHA"], "DD/MM/YYYY").toDate().getTime(),
          };
        })
    );
    res.json(dataProcess.sort((a, b) => a.payedAt < b.payedAt));
  } catch (error) {
    res.serverError(error);
  }
};
