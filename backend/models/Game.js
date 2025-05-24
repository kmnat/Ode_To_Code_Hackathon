const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  _id: String,
  questions: [
    {
      questionId: String,
      questionText: String,
      answers: [
        {
          answerId: String,
          answerText: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Game', gameSchema);
