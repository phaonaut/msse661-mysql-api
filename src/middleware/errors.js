export function NotFound(err, req, res, next) {
  next({ status: 404, message: 'Route does not exist' });
};

export function GeneralError(err, req, res, next) {
  res.status(err.status || 500).json({ error: err.message });
}