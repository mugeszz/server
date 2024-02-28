const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const CrimeNews = require("../model/crime");
require("dotenv").config();
const uri = process.env.DB;

mongoose.connect(uri);

router.post("/create-news", async (req, res) => {
  try {
    const news = new CrimeNews({
      title: req.body.title,
      
      description: req.body.description,
    });

    const saveNews = await news.save();
    await res.status(200).send(saveNews);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

router.get("/getAllNews", async (req, res) => {
  try {
    const news = await CrimeNews.find();
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

router.get("/getOneNews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const news = await CrimeNews.findById(id);
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

router.put("/editNews", async (req, res) => {
  try {
    const { id } = req.params;
    const edit = {
      title: req.body.title,
      description: req.body.description,
    };
    const news = await CrimeNews.findByIdAndUpdate(edit, id);
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

router.delete("/deleteNews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const news = await CrimeNews.findByIdAndDelete(id);
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

module.exports = router;
