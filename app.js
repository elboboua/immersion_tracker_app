require("dotenv").config();
require("./config/passport-setup");

const express = require("express");
const passport = require("passport");
const PORT = process.env.PORT || 3000;
const cookieSession = require("cookie-session");
const keys = require("./config/keys");
const hbs = require("express-handlebars");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const logRoutes = require("./routes/log.routes");
const languageRoutes = require("./routes/language.routes");
const typeRoutes = require("./routes/type.routes");
const staticRoutes = require("./routes/static.routes");
const accountRoutes = require("./routes/account.routes");
const statsRoutes = require("./routes/statistics.routes");
const privacyRoutes = require("./routes/privacy.routes");
const homepageRoutes = require("./routes/homepage.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const followerRoutes = require("./routes/follower.routes");
const appImageUploadRoutes = require("./routes/appImageUpload.routes");

const { isAuthorized } = require("./middleware/authchecker");
const { isJWTAuthorized } = require("./middleware/JWTauthchecker");
const { hasUsername } = require("./middleware/username_checker");
const { hasFocusLang } = require("./middleware/focus_language_checker");
const { isAdmin } = require("./middleware/admin_checker");

const app = express();

app.use(
  cookieSession({
    keys: keys.sessionKeys,
    resave: false,
    saveUninitialized: false,
    maxAge: 24 * 60 * 60 * 1000 * 7,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(morgan("dev"));

app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/homepage", homepageRoutes);
app.use("/language", languageRoutes);
app.use("/type", typeRoutes);
app.use("/followers", followerRoutes);
app.use("/privacy", privacyRoutes);
app.use("/appImageUpload", isJWTAuthorized, appImageUploadRoutes);
app.use("/account", isAuthorized, accountRoutes);
app.use("/stats", isAuthorized, statsRoutes);
app.use("/log", isAuthorized, logRoutes);
app.use("/", isAuthorized, hasUsername, hasFocusLang, staticRoutes);
app.use("/admin", isAdmin, adminRoutes);

// production error handler
// no stacktraces leaked to user
app.use("*", (req, res) => {
  res.render("error", { error: 404, message: "This page doesn't exist." });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
