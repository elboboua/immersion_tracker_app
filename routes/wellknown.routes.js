const router = require("express").Router();
const knex = require("../config/KnexConnection");

const aasa = require("../apple-app-site-association.json");

router.get("/apple-app-site-association", async (req, res) => {
  res.set("Content-Type", "application/json");
  res.status(200).send(aasa);
});

module.exports = router;
