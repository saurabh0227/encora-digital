const express = require('express');
const fs = require('fs');
const path = require('path');
const lodash = require('lodash');
const swaggerUi = require('swagger-ui-express');

const config = require('../config/config');

const router = express.Router();

let swaggerDoc = fs.readFileSync(path.join(__dirname, 'swagger.json'), {
  encoding: 'utf-8',
});
swaggerDoc = JSON.parse(swaggerDoc);
lodash.set(swaggerDoc, 'host', `${process.env.APP_HOST}:${process.env.PORT}`);
lodash.set(swaggerDoc, 'schemes', [process.env['APP.SCHEME']]);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
router.use('/api-docs.json', (req, res) => {
  res.json(swaggerDoc).end();
});

module.exports = router;
