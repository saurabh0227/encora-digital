const moment = require('moment');
const mongoose = require('mongoose');

const Note = require('./model');

const controller = 'notes';

exports.create = async (req, res) => {
  console.log(
    `${moment()} | ${
      req.reqId
    } | ${controller} | create | body => ${JSON.stringify(req.body)}`
  );
  try {
    const body = req.body;
    body.userId = req.userId;
    const note = await Note.create(body);
    if (note.errors) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Error in creating note.',
        },
      });
      return;
    }
    res.status(200).send({
      status: true,
      success: {
        message: 'Note added successfully!',
        data: [note],
      },
      error: null,
    });
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | create | error => ${error.toString()}`
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

exports.fetchAll = async (req, res) => {
  console.log(
    `${moment()} | ${
      req.reqId
    } | ${controller} | fetchAll | body => ${JSON.stringify(req.body)}`
  );
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = parseInt(req.query.page);
    const skip = (page - 1) * limit;
    const notes = await Note.find({ active: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    if (notes.length === 0) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Notes not found.',
        },
      });
      return;
    }
    res.status(200).send({
      status: true,
      success: {
        message: 'Note fetched successfully!',
        data: [notes],
      },
      error: null,
    });
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | fetchAll | error => ${error.toString()}`
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

exports.fetchByUser = async (req, res) => {
  console.log(
    `${moment()} | ${
      req.reqId
    } | ${controller} | fetchByUser | body => ${JSON.stringify(req.body)}`
  );
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const page = parseInt(req.query.page);
    const skip = (page - 1) * limit;
    const notes = await Note.find({ active: true, userId: req.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    if (notes.length === 0) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Notes not found.',
        },
      });
      return;
    }
    res.status(200).send({
      status: true,
      success: {
        message: 'Note fetched successfully!',
        data: [notes],
      },
      error: null,
    });
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | fetchByUser | error => ${error.toString()}`
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

exports.update = async (req, res) => {
  console.log(
    `${moment()} | ${
      req.reqId
    } | ${controller} | update | body => ${JSON.stringify(req.body)}`
  );
  try {
    const body = req.body;
    const note = await Note.findOneAndUpdate({ _id: req.params.noteId }, body, {
      new: true,
    });
    if (!note) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Error in updating note.',
        },
      });
      return;
    }
    res.status(200).send({
      status: true,
      success: {
        message: 'Note updated successfully!',
        data: [note],
      },
      error: null,
    });
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | update | error => ${error.toString()}`
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

exports.remove = async (req, res) => {
  console.log(
    `${moment()} | ${
      req.reqId
    } | ${controller} | remove | body => ${JSON.stringify(req.body)}`
  );
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.noteId },
      { active: false },
      {
        new: true,
      }
    );
    if (!note) {
      res.status(200).send({
        status: false,
        success: null,
        error: {
          message: 'Error in deleting note.',
        },
      });
      return;
    }
    res.status(200).send({
      status: true,
      success: {
        message: 'Note deleted successfully!',
        data: [note],
      },
      error: null,
    });
  } catch (error) {
    console.log(
      `${moment()} | ${
        req.reqId
      } | ${controller} | remove | error => ${error.toString()}`
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
