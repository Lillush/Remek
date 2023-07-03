const mongoose = require("mongoose");

const EventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 25,
    },
    description: {
      type: String,
      required: false,
    },
    game: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    eventPage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
