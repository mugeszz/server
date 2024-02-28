const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.DB;

app.use(cors({ origin: true }));
app.use(express.json());



/// cinema
const cinemaNewsRoutes = require("./routes/cinemanews");
app.use("/cinemanews", cinemaNewsRoutes);

/// crime
const crimeNewsRoutes = require("./routes/crimenews");
app.use("/crimenews", crimeNewsRoutes);

/// economics
const economicsNewsRoutes = require("./routes/economicalnews");
app.use("/economicsnews", economicsNewsRoutes);

/// politics
const politicsNewsRoutes = require("./routes/politics");
app.use("/politicsnews", politicsNewsRoutes);

/// sports news
const sportsNewsRoutes = require("./routes/sportsnews");
app.use("/sportsnews", sportsNewsRoutes);

/// world
const worldNewsRoutes = require("./routes/worldnews");
app.use("/worldnews", worldNewsRoutes);



mongoose
  .connect(URL)
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch((err) => {
    console.error(err);
  });

  app.listen(4050, () => {
    console.log("port works in 4050");
  });