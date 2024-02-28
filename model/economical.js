const mongoose = require("mongoose");

const newsScheme = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

   
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const economicNews = mongoose.model("Economic", newsScheme)
module.exports = economicNews