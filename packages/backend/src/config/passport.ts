import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { User } from '../entities/User.entity';
import UserService from '../services/user.service';

const userService = new UserService();

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
