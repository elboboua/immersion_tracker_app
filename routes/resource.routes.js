const router = require("express").Router();
const { createWriteStream } = require("fs");
const path = require("path");
const multer = require("multer");

// multer is for storing files on the hd
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgs/resource_images");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
let upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      req.fileValidationError = "wrong file type!";
      return cb(null, false, new Error("wrong file type!"));
    }
  },
});

router.get("/upload-resource", (_, res) => {
  res.render("upload-resource");
});

router.post("/create", upload.single("photo"), async (req, res) => {
  //let data = JSON.parse(req.body.data);
  console.log(JSON.parse(req.body.json));
  if (!req.file) {
    return res.send({
      message: "There has been a problem uploading the file. Please try again.",
    });
  }

  res.send({ message: "You're missing necessary fields" });
});

module.exports = router;
