const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: 'failed',
        message: 'Unauthorized',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    req.user = decoded;

    next(); 
  } catch (err) {
    return res.status(401).json({
      status: 'failed',
      message: 'Invalid token',
    });
  }
};