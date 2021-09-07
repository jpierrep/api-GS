module.exports = async function (req, res) {
  try {
    const fs = require("fs-extra");
    var SkipperDisk = require("skipper-disk");
    var fileAdapter = SkipperDisk();

    let { id, disposition = "inline", type = "Default" } = req.allParams();
    let file = await Archive.findOne(id);
    let path = "";

    if (!file) {
      throw new Error("file not found");
    }

    if (type == "thumb") {
      path = file.pathThumbnail;
    } else if (type == "regular") {
      path = file.pathThumbnailRegular;
    } else {
      path = file.path;
    }

    if (!fs.existsSync(path)) {
      throw new Error("File not Found");
    }

    const extension = file.classFile === "Pdf" ? ".pdf" : "";
    const filename =
      encodeURI((file.filename || "--").replace(/,|;/g, "")) + extension;
    res.set(
      "Content-disposition",
      disposition + "; filename*=UTF-8''" + filename
    );

    fileAdapter
      .read(path)
      .on("error", (err) => {
        res.serverError(err);
      })
      .pipe(res);
  } catch (err) {
    res.serverError(err);
  }
};
