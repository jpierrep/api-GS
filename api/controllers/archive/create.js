module.exports = async function (req, res) {
  try {
    const uuid = require("uuid/v4");
    const moment = require("moment");
    const { classFile, lastModified } = req.body;

    const dirname = ".tmp/uploads/";
    const saveAs = uuid();
    let fileUploaded = await new Promise((res, rej) => {
      req.file("file").upload(
        {
          saveAs,
          maxBytes: 30000000,
        },
        (err, files) => (err ? rej(err) : res(files[0]))
      );
    });

    if (!fileUploaded) {
      throw new Error("No se ha subido el archivo");
    }

    let [extension] = fileUploaded.filename.match(/\.[0-9a-zA-Z]+$/) || [];

    let archiveCreated = await Archive.create({
      path: dirname + saveAs,
      filename: fileUploaded.filename,
      extension: extension.toLowerCase(),
      size: fileUploaded.size,
      classFile,
      lastModified: lastModified
        ? moment(lastModified, "YYYY:MM:DD HH:mm:ss").toDate()
        : undefined,
    }).fetch();

    res.json(archiveCreated);
  } catch (err) {
    res.serverError(err);
  }
};
