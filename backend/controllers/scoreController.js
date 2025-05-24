const Score = require('../models/Score');

exports.createScore = async (req, res) => {
  try {
    const score = new Score(req.body);
    await score.save();
    res.status(201).json(score);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllScores = async (req, res) => {
  try {
    const scores = await Score.find();
    console.log("scores", scores);
    
    res.json(scores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
