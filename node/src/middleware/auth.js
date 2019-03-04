export default function (options) {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).json({ 'message': 'access denied' });
  };
}