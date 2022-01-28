// import util from "util";
// import multer from "milter";
// import { GridFsStorage } from "multer-gridfs-storage";

// // import dotenv from  "dotenv"

// const config = process.env;

// const storageConfig = {
//   url: config.SRV_DB_SERVER_URI + config.SRV_DB_NS,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     const match = ["image/png", "image/jepg"];

//     if (match.indexOf(file.mimetype === -1)) {
//       const filename = `${Date.now()}-bezkoder-${file.originalname}`;
//       return filename;
//     }

//     return {
//       bucketName: config.IMGBUCKET,
//       filename: `${Date.now()}-bezkoder-${file.originalname}`
//     };
//   },
// };

// var storage = new GridFsStorage(storageConfig);


const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");


var storage = new GridFsStorage({
  url: dbConfig.url + dbConfig.database,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: dbConfig.imgBucket,
      filename: `${Date.now()}-bezkoder-${file.originalname}`
    };
  }
});

var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;


var uploadFiles = multer({ storage: storage }).single("file");
const uploadFilesMiddleware = util.promisify(uploadFiles);

export default uploadFilesMiddleware


