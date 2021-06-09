const router = require("express").Router();
const knex = require("../config/KnexConnection");
const fs = require("fs");
const path = require("path");

const aasa = fs.readFileSync(
  path.resolve(__dirname, "../apple-app-site-association")
);

router.get("/apple-app-site-association", async (req, res) => {
  res.set("Content-Type", "application/json");
  res.status(200).send(aasa);
});

module.exports = router;
