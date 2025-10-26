const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/User');

// Enhanced cookie extractor with better debugging
const cookieExtractor = (req) => {
  let token = null;
  
  if (req && req.cookies) {
    // Prioritize 'token' cookie, fallback to 'jwt'
    token = req.cookies.token || req.cookies.jwt;
    
  }
  
  return token;
};

// Local Strategy for Login 
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        user.password = undefined;
        return done(null, user);
      } catch (error) {
        console.error('Local strategy error:', error);
        return done(error);
      }
    }
  )
);

// Enhanced JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key-here',
      ignoreExpiration: false, // Explicitly handle expired tokens
      passReqToCallback: true, //allow access to req

    },
    async (req,jwtPayload, done) => {
      try {
        // Check if token is expired
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (jwtPayload.exp && jwtPayload.exp < currentTimestamp) {
          return done(null, false, { message: 'Token expired' });
        }

        const user = await User.findById(jwtPayload.id);
        
        if (user) {
          return done(null, user);
        }
        
        console.log('User not found for JWT payload ID:', jwtPayload.id);
        return done(null, false, { message: 'User not found' });
      } catch (error) {
        console.error('JWT strategy error:', error);
        return done(error, false);
      }
    }
  )
);

module.exports = passport;