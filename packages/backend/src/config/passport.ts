import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  new JwtStrategy(opts, async (token, done) => {
    try {
      return done(null, token.id);
    } catch (error) {
      done(error);
    }
  })
);

export default passport;
