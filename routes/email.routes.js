const router = require("express").Router();
const knex = require("../config/KnexConnection");

router.get("/unsubscribe/:email", async (req, res) => {
  try {
    let result = await knex("user").where({ email: req.params.email });

    if (result.length == 0) {
      res.send(
        `Error with email: ${req.params.email} There is no matching email in our systems.`
      );
    } else {
      let unsub = await knex("user")
        .where({ email: req.params.email })
        .update({ subscribed_for_emails: false });
      res.send(`Email removed from list.`);
    }
  } catch {
    res.send(
      `There has been a problem with our servers. Please try again soon.`
    );
  }
});

module.exports = router;
