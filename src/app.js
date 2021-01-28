const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const uuid = require('uuid');

const apiV1 = require('./apiV1/index');
const swaggerRoute = require('./swagger/route');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Data.now() + path.extname(file.originalname));
  },
});

class App {
  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
  }

  setMiddlewares() {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(swaggerRoute);

    morgan.token('req-body', (req) => {
      return JSON.stringify(req.body);
    });

    morgan.token('date', () => {
      return moment().format();
    });

    morgan.token('id', function getId(req) {
      return req.id;
    });

    const assignId = (req, res, next) => {
      req.reqId = uuid.v4();
      next();
    };

    const accessLogStream = fs.createWriteStream('./logs/access.log', {
      flags: 'a',
    });
    this.express.use(assignId);
    this.express.use(
      morgan(
        '[:date[Asia/Kolkata]] :id :method :url :status :req-body :response-time ms :res[content-length]',
        { stream: accessLogStream }
      )
    );
  }

  setRoutes() {
    this.express.use('/v1', apiV1);
  }
}

module.exports = new App().express;
