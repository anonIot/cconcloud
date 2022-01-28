import express from "express";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from  "dotenv"

dotenv.config()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let suffix = file.mimetype;
    suffix = suffix.split("/");
    let typeImg = suffix[1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + typeImg);
  },
});






var storage2 = new GridFsStorage({
  url: process.env.SRV_DB_SERVER_URI+"/"+process.env.SRV_DB_NS,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-bezkoder-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: process.env.IMGBUCKET,
      filename: `${Date.now()}-bezkoder-${file.originalname}`
    };
  }
});








const upload = multer({ storage: storage });
const upload2DB = multer({ storage: storage2 });

const Router = express.Router();

Router.get("/", (req, res) => {
  res.send(`<form method="POST" action="/">
    <input type="text" name="username" placeholder="username">
    <input type="submit">
  </form>`);
});

Router.post("/", upload.none(), (req, res) => {
  
  res.send(JSON.stringify(optionConfig));
});

Router.post("/product", upload.single("product_img"), function (req, res) {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  console.log(req.file, req.body);
  res.send(JSON.stringify(req.body));
});

// Router.post('/send', upload.none(), (req, res) => {
//     const formData = req.body;
//     console.log('form data', formData);
//     res.sendStatus(200);
//   });

export default Router;
