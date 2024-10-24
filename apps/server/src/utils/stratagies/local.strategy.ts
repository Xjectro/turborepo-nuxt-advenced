import passport from "passport";
import { Strategy } from "passport-local";
import { createEmail } from "../helpers/email";
import { Auth, User, Tfa } from "@repo/database";
import { sendEmail } from "../../services/transport.services";

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).populate("auth");

    done(null, user);
  } catch (err: any) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const auth = await Auth.findOne({ email });

        if (!auth || !(await auth.comparePassword(password))) {
          return done(null, false, {
            message: "Email or password is incorrect!",
          });
        }

        const user = await User.findById(auth.user);

        if (!user) {
          await auth.deleteOne();
          return done(null, false, {
            message: "Email or password is incorrect!",
          });
        }

        if (req.body.usage_code) {
          const tfa = await Tfa.checkTfa({ usage_code: req.body.usage_code });
          if (!tfa)
            return done(null, false, { message: "Usage code is incorrect." });

          if (tfa.interaction == "login") {
            done(null, user);
            return;
          }

          return done(null, false, { message: "Usage code is incorrect." });
        }

        if (auth.tfa) {
          const { usage_code } = await Tfa.createTfa({
            user: auth.user._id,
            interaction: "login",
          });

          const html = await createEmail({
            name: "auth-login",
            style: "html",
            params: {
              code: usage_code,
            },
          });

          await sendEmail({
            to: email,
            subject: `${auth.user.firstName} Your login code`,
            html,
          });

          return done(null, false, {
            message: "2FA required, check your email for the code.",
          });
        }

        done(null, user);
      } catch (err: any) {
        return done(err);
      }
    },
  ),
);
