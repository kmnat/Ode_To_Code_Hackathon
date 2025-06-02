const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Build Mongo URI securely
const mongoURI = ``;

// MongoDB connection
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const gradRoutes = require('./routes/gradRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const generalRoutes = require('./routes/generalRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/grads', gradRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api', generalRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Backend is working!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
