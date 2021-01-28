const moment = require('moment');
const bcrypt = require('bcrypt');

const User = require('./model');
const { generateToken } = require('../auth/controller');

const controller = 'users';

exports.signup = async (req, res) => {
  console.log(
    `${moment()} | ${
      req.reqId
    } | ${controller} | signup | body => ${JSON.stringify(req.body)}`
  );
  try {
    const body = req.body;
    const password = await bcrypt.hashSync(body.password, 5);
    body.password = password;
    body.loginType = 'email';
    const userData = new User(body);
    const insertedUser = await userData.save();
    const user = await User.findOne(
      { email: insertedUser.email },
      { password: 0 }
    );
    const token = await generateToken(
      { email: user.email, userId: user._id.toString() },
      req.reqId
    );
    res.status(200).send({
      status: true,
      success: {
        message: 'Registered successfully!',
        data: [user],
        token: token,
      },
      error: null,
    });
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | signup | error => ${error.toString()}`
    );
    res.status(500).send({
      status: false,
      success: null,
      error: {
        message: 'Something went wrong!',
      },
    });
  }
};

exports.login = async (req, res) => {
  console.log(
    `${moment()} | ${
      req.reqId
    } | ${controller} | login | body => ${JSON.stringify(req.body)}`
  );
  try {
    const body = req.body;
    const userData = await User.findOne({ email: body.email }, { password: 0 });
    if (!userData) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Please register first!',
        },
      });
    } else {
      const password = (
        await User.findOne({ email: body.email }, { password: 1 })
      ).password;
      const passwordsMatch = await bcrypt.compareSync(body.password, password);
      if (passwordsMatch) {
        const token = {
          token: await generateToken(
            { email: userData.email, userId: userData._id.toString() },
            req.reqId
          ),
        };
        res.status(200).send({
          status: true,
          success: {
            message: 'Successfully logined!',
            data: [token],
          },
          error: null,
        });
      } else {
        res.status(403).send({
          status: false,
          success: null,
          error: {
            message: 'Access forbidden!',
          },
        });
      }
    }
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | login | error => ${error.toString()}`
    );
    res.status(500).send({
      status: false,
      success: null,
      error: {
        message: 'Something went wrong!',
      },
    });
  }
};
