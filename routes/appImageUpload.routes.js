const router = require("express").Router();
const knex = require("../config/KnexConnection");
const multer = require("multer");

// multer is for storing files on the hd
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgs/avatars");
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

router.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
  if (!req.file) {
    return res.send({
      message: "There has been a problem uploading the file. Please try again.",
    });
  } else {
    let result = await knex("user")
      .where({ id: req.user.id })
      .update({ avatar_name: req.file.filename });
    console.log(result);
    if (result > 0) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404);
    }
  }
});

module.exports = router;
