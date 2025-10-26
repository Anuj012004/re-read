const passport = require('passport');

// Protect routes - require valid JWT token in cookie
exports.protect = (req, res, next) => {
  // Add request tracking to debug multiple calls
  if (!req._authCalled) {
    req._authCalled = true;
  }

  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error('Auth middleware error:', err);
      return res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, please login',
        debug: process.env.NODE_ENV === 'development' ? info : undefined
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

// Optional auth - doesn't require login but adds user if logged in
exports.optionalAuth = (req, res, next) => {
  if (!req._optionalAuthCalled) {
    req._optionalAuthCalled = true;
  }

  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error('Optional auth error:', err);
      // Continue without user instead of throwing error
      req.user = null;
      return next();
    }
    
    if (user) {
      req.user = user;
    } else {
      req.user = null;
    }
    
    next();
  })(req, res, next);
};

