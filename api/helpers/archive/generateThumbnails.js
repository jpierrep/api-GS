const generateThumbnails = {
  friendlyName: "Generate Thumbnails",
  description: "Generate Thumbnails",
  inputs: {
    path: {
      example: "",
      description: "Ruta del archivo",
      required: true,
    },
  },
  fn: async ({ path }) => {
    /*     try {
      const uuid = require("uuid/v4");
      const sharp = require("sharp");

      const dirname = ".tmp/uploads/";

      const pathThumbnailRegular = dirname + uuid();
      await new Promise((res, rej) => {
        sharp(path)
          .resize({
            height: 800,
            fit: sharp.fit.contain,
          })
          .toFile(pathThumbnailRegular, (err) => {
            if (err) {
              return rej(err);
            }
            res();
          });
      });

      const pathThumbnail = dirname + uuid();
      await new Promise((res, rej) => {
        sharp(path)
          .resize({
            height: 80,
            fit: sharp.fit.contain,
          })
          .toFile(pathThumbnail, (err) => {
            if (err) {
              return rej(err);
            }
            res();
          });
      });
      return {
        pathThumbnail,
        pathThumbnailRegular,
      };
    } catch (error) {
      sails.log(error);
    } */
  },
};
module.exports = generateThumbnails;
