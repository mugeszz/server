const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const CrimeNews = require("../model/crime");
require("dotenv").config();
const uri = process.env.DB;

// Connect to MongoDB with error handling
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Create news
router.post("/create-news", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }
    const news = new CrimeNews({ title, description });
    const saveNews = await news.save();
    res.status(200).send(saveNews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

// Get all news
router.get("/getAllNews", async (req, res) => {
  try {
    const news = await CrimeNews.find();
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

// Get one news by ID
router.get("/getOneNews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const news = await CrimeNews.findById(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

// Edit news by ID
router.put("/editNews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const edit = {
      title: req.body.title,
      description: req.body.description,
    };
    const news = await CrimeNews.findByIdAndUpdate(id, edit, { new: true });
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "something went wrong",
    });
  }
});

// Delete news by ID
router.delete("/deleteNews/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const news = await CrimeNews.findByIdAndDelete(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = router;

