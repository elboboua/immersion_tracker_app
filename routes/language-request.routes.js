const router = require("express").Router();
const { KnexTimeoutError } = require("knex");
const knex = require("../config/KnexConnection");

router.get("/", (req, res) => {
  res.render("language-requests");
});

router.get("/get-language-requests", async (req, res) => {
  let languages = await knex("language").orderBy("language.name");
  let requestedLanguages = await knex("language_request").where({
    approved: null,
  });
  requestedLanguages.forEach((request) => {
    request.similar = languages.filter(
      (language) => request.name[0] === language.name[0]
    );
  });

  res.send(requestedLanguages);
});

router.post("/classify-language-request", async (req, res) => {
  try {
    let result = await knex("language_request")
      .update({ approved: req.body.classified })
      .where({ name: req.body.name });

    if (req.body.classified == "1") {
      let languages = await knex("language").where({ name: req.body.name });
      if (languages.length == 0) {
        let result = await knex("language").insert({ name: req.body.name });
      }
    }
  } catch {
    res.status(400).send("Something went wrong");
  }

  res.status(200).send("OK");
});

module.exports = router;
