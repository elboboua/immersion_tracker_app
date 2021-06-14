require("dotenv").config();
const fetch = require("node-fetch");
var FormData = require("form-data");
const mailgun = require("mailgun-js");
const mg = mailgun({
  apiKey: process.env.MG_API_KEY,
  domain: process.env.MG_DOMAIN,
});
const router = require("express").Router();

const emailText = `Hey guys,

First and foremost, thanks for signing up to get notifications about the #30DGLC! I hope that you find value in it. My goal is for us to use our languages in ways the make us feel good about life. This practice shouldn’t stress you out, and if it does, there’s no need to complete these prompts within 30 days. Feel free to take it at a pace you’re most comfortable with. I’d love to hear back from you if you have anything you want to say or suggest about the challenge. Feel free to reply directly to this message. I’ll be sending reminders every so often just to check in. Keep calm and language on!

Here are the 30 prompts:

1. Who is a person in your life that you are thankful for?
2. What is your favorite drink and why do you love it? How does it make you feel?
3. What’s a dish that reminds you of a happy moment in your life?
4. What is your favorite time of day?
5. Who is your role model in your language learning journey?
6. Speak about a time you’ve felt extremely blessed.
7. What is a language resource that has given you a ton of value?
8. What about the language learning community do you love?
9. What is one activity that brings you joy when you feel down?
10. Success is self defined. Talk about your accomplishments in your target language.
11. Talk about 10 things that you like about yourself.
12. Talk about a part of your body that you are grateful for.
13. Talk about how you are able to help others now or in the future.
14. What technological device helps you the most in your language learning?
15. What is one aspect of your health that you’re more grateful for?
16. Talk about something you bought recently that has added value to your life.
17. Speak about a time you witnessed a random act of kindness.
18. What is a hobby you really enjoy? If you can’t think of one, what would be a hobby you think you’d enjoy?
19. Who is a person you’re thankful for from work/school? Describe their good qualities.
20. Failures can help us on our road to success. Speak about a time when failure has led you to success.
21. Speak about an animal, pet or otherwise, and what makes them special.
22. Speak about a time you traveled and saw something special.
23. Think about your community (religious, local, or language), and speak about something that you appreciate about them.
24. Speak about a family tradition that you find value in.
25. Talk about your favorite place in your house. Describe it. Why do you like it?
26. Talk about some of your favorite possessions.
27. What is your favorite holiday, and why do you love it?
28. What fear are you currently facing?  How can you use this fear to your advantage?
29. What’s an accomplishment you’re proud of?
30. What skill(s) do you have that you’re grateful for?


Best, 
Ahmad`;

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
      const data = {
        from: "Ahmad<ahmad@polylogger.com>",
        to: req.body.email,
        subject: `30 Day Gratitude Language Challenge`, // Subject line,
        text: emailText,
      };

      mg.messages().send(data, function (error, body) {
        console.log(body.message);
      });
      return res.render("result", {
        message:
          "Email successfully added to the list! We've sent you a welcome email!",
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
