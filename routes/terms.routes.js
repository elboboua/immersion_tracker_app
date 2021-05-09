const privacyPolicy = require("../constants/termsOfUse");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("error", {
    error: "Terms of Use",
    privacyPolicy,
  });
});

module.exports = router;
