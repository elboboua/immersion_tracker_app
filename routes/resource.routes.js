const router = require("express").Router();
const { createWriteStream } = require("fs");
const path = require("path");
const multer = require("multer");
const knex = require("../config/KnexConnection");
const rateLimit = require("express-rate-limit");

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

// web page for uploading resource
router.get("/upload-resource", (req, res) => {
  if (req.query.message) {
    res.render("upload-resource", { message: req.query.message });
  } else if (req.query.error) {
    res.render("upload-resource", { error: req.query.error });
  } else {
    res.render("upload-resource");
  }
});

// rate limiting creating uploads
const createResourceLimiter = rateLimit({
  windowMs: 1000 * 60, // 1 minute window
  max: 3, // start blocking after 5 requests
  message:
    "Please don't try to pollute our database. It takes hard work and time to create resources of value to others.",
});

// upload resource to db
router.post(
  "/create",
  createResourceLimiter,
  upload.single("photo"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).send({
        error: "You gotta have an image in your upload.",
      });
    } else {
      try {
        let json = JSON.parse(req.body.json);
        // upload name, transliterated name, description, link to db
        let uploadMainInfo = await knex("resource").insert({
          name: json.name,
          name_transliteration: json.transliteratedName,
          description: json.description,
          link: json.link,
          photo_url: req.file.filename,
        });

        let resourceId = uploadMainInfo[0];

        // upload languageIds to db
        let languageIds = [...new Set(json.languageIds)];

        for (let i = 0; i < languageIds.length; i++) {
          let uploadLanguageId = await knex("resource_language").insert({
            resource_id: resourceId,
            language_id: languageIds[i],
          });
        }

        // upload levelIds to db
        let levelIds = [...new Set(json.levelIds)];

        for (let i = 0; i < levelIds.length; i++) {
          let uploadLevelId = await knex("resource_language_level").insert({
            resource_id: resourceId,
            language_level_id: levelIds[i],
          });
        }
        // upload categoryIds to db
        let categoryIds = [...new Set(json.categoryIds)];

        for (let i = 0; i < categoryIds.length; i++) {
          let uploadCategoryId = await knex("resource_type").insert({
            resource_id: resourceId,
            resource_type_id: categoryIds[i],
          });
        }

        // upload typeIds to db
        let typeIds = [...new Set(json.typeIds)];

        for (let i = 0; i < typeIds.length; i++) {
          let uploadTypeId = await knex("resource_learning_type").insert({
            resource_id: resourceId,
            type_id: typeIds[i],
          });
        }
        return res
          .status(200)
          .send({ message: "Resource successfully uploaded" });
      } catch (error) {
        console.log(error);
        return res.status(404).send({ message: "There has been a problem" });
      }
    }
  }
);

module.exports = router;
