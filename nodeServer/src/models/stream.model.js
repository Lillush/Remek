const mongoose = require("mongoose");

const StreamSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    game: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    streamLink: String,
    // creator: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Streamer",
    //   required: false,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stream", StreamSchema);
