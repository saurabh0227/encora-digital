const { Schema, model } = require('mongoose');

const NoteSchema = Schema(
  {
    active: { type: Boolean, default: true },
    description: { type: String, default: null },
    userId: { type: String, default: null },
  },
  {
    timestamps: true,
    useNestedStrict: true,
  }
);

module.exports = model('Note', NoteSchema);
