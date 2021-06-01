require("dotenv").config();
const fetch = require("node-fetch");
var FormData = require("form-data");
const mailgun = require("mailgun-js");
const mg = mailgun({
  apiKey: process.env.MG_API_KEY,
  domain: process.env.MG_DOMAIN,
});
const router = require("express").Router();

router.get("/30DGLC", (_, res) => {
  res.render("upload-email");
});

router.post("/30DGLC-sign-up", async (req, res) => {
  const body = new FormData();
  body.append("address", req.body.email);
  body.append("name", req.body.name);

  try {
    let result = await fetch(
      "https://api.mailgun.net/v3/lists/30DGLC@polylogger.com/members",
      {
        method: "post",
        body,
        headers: {
          Authorization: `Basic ${Buffer.from(
            "api" + ":" + process.env.MG_API_KEY
          ).toString("base64")}`,
        },
      }
    );
    if (result.status == 200) {
      console.log(await result.json());
      return res.render("result", {
        message: "Email successfully added to the list!",
      });
    } else {
      console.log(result.status);
    }
  } catch (error) {
    console.log(error);
  }

  return res.render("result", { error: "Unable to add email to the list." });
});

router.get("/cancel-30DGLC", (req, res) => {
  res.render("remove-email");
});

router.post("/30DGLC-cancel", async (req, res) => {
  if (!req.body.email) res.status(404).send({ error: "No email provided" });
  let email = req.body.email;

  try {
    let result = await fetch(
      `https://api.mailgun.net/v3/lists/30DGLC@polylogger.com/members/${email}`,
      {
        method: "delete",
        headers: {
          Authorization: `Basic ${Buffer.from(
            "api" + ":" + process.env.MG_API_KEY
          ).toString("base64")}`,
        },
      }
    );
    if (result.status == 200) {
      console.log(await result.json());
      return res.render("result", {
        message: "Email successful deleted from the list",
      });
    } else {
      console.log(result.status);
    }
  } catch (error) {
    console.log(error);
  }
  return res.render("result", {
    error:
      "There has been a problem with your request. Either your email is not on the list, or there is a server error.",
  });
});

module.exports = router;
