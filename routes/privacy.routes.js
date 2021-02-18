const privacyPolicy = require("../constants/privacyPolicy");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("error", {
    error: "Privacy Policy",
    privacyPolicy,
  });
});

module.exports = router;
