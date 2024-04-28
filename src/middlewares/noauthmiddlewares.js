export function nonSecurePaths(req, res, next) {
    const nonSecurePaths = ['/', '/registation', '/login'];
    if (nonSecurePaths.includes(req.path)) return next();
    next();
  }