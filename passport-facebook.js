const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const userModel = require("./models/user");

require("dotenv").config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: [
        "id",
        "displayName",
        "photos",
        "posts",
        "emails",
        "birthday",
        "gender",
        "hometown",
        "location",
        "link",
        "likes",
        "friends",
        "about",
      ],
    },
    function (accessToken, refreshToken, profile, done) {
      const { name, picture, email, posts } = profile._json;
      const date = new Date().getTime();
      const userData = {
        email: email,
        username: name,
        profile_image: picture.data,
        provider: "facebook",
        registrated_at: date,
      };

      userModel.findOne({ email: email }, function (error, user) {
        if (error) return done(null, false, { error });
        if (user) {
          done(null, user);
        } else {
          new userModel(userData).save().then((result) => done(null, result));
        }
      });
    }
  )
);
