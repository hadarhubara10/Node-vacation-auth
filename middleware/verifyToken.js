const User = require('../models/user');
const jwt = require('jsonwebtoken');
const TOKEN_KEY = process.env.TOKEN_KEY;
const CLIENT_ID = process.env.CLIENT_ID;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader.startsWith('Bearer ')) {
    // Get Token from headers
    token = authHeader.substring(7, authHeader.length);
    if (token !== '') {
      jwt.verify(token, TOKEN_KEY, (err, decoded) => {
        if (err) return res.status(401).send('Invalid Token');

        User.findById(decoded.user_id)
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) => {
            return res.status(401).send('Invalid Token');
          });
      });
    } else {
      return res.status(403).send('A token is required for authentication');
    }
  } else {
    return res.status(403).send('A token is required for authentication');
  }
};

module.exports = verifyToken;
