const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    active: { type: Boolean, default: true },
    name: { type: String, default: null },
    email: {
      type: String,
      unique: true,
      match: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
      trim: true,
      default: null,
    },
    password: { type: String, default: null },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  }
);

module.exports = model('User', UserSchema);
