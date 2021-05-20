const router = require("express").Router();
const knex = require("../config/KnexConnection");

router.get("/", async (req, res) => {
  let result = await knex("resource_type_name").orderBy("name", "asc");
  res.send(result);
});

module.exports = router;
