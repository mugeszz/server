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

const politicsNews = mongoose.model("Politics", newsScheme)
module.exports = politicsNews