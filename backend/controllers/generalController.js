const Game = require('../models/Game');
const PM = require('../models/PM');

exports.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    console.log("games",games);
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPMs = async (req, res) => {
  try {
    const pms = await PM.find();
    res.json(pms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
