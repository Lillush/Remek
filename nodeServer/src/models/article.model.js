const mongoose = require("mongoose");

const ArticleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 25,
      validate: {
        validator: function (v) {
          return /^[A-Ű][A-Űa-Ű .0-9]{3,24}$/.test(v);
        },
      },
    },
    category: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
    },
    article1: {
      type: String,
      required: true,
    },
    article2: {
      type: String,
      required: false,
    },
    article3: {
      type: String,
      required: false,
    },
    postImg: {
      type: String,
      required: true,
    },
    mainImg: {
      type: String,
      required: true,
    },
    lead: {
      type: Boolean,
      required: true,
    },
    postDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
