import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  jwt.verify(token, 'YOUR_SECRET_KEY', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id; // Assuming the token contains a user ID
    next();
  });
};
