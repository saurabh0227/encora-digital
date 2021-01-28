const jwt = require('jsonwebtoken');
const moment = require('moment');

const config = require('../../config/config');

const controller = 'auth';

exports.generateToken = async (signField, reqId) => {
  try {
    const token = await jwt.sign({ signField }, config.JWT_ENCRYPTION, {
      expiresIn: config.JWT_EXPIRATION,
    });
    return token;
  } catch (error) {
    console.log(
      `${moment()} | ${reqId} | ${controller} | generateToken | error => ${error.toString()}`
    );
  }
};

exports.verifyToken = async (req, res, next) => {
  let decoded = false;
  try {
    decoded = await jwt.verify(
      req.headers['authorization'],
      config.JWT_ENCRYPTION
    );
  } catch (error) {
    return res
      .status(401)
      .send({ message: 'Session expired. Please login again.' });
  }
  if (decoded.signField.userId) {
    req.email = decoded.signField.email;
    req.userId = decoded.signField.userId;
    return next();
  } else {
    return res.status(400).send({ message: 'Invalid Access Token' });
  }
};
