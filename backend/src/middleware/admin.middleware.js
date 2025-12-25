import jwt from 'jsonwebtoken';

export const requireAdmin = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. Invalid token format.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user is admin
    if (decoded.email !== 'starhacker160@gmail.com') {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Access denied. Invalid token.' });
  }
};