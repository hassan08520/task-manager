// backend/index.js
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1️⃣  Connect to MongoDB ---------------------------------------------
mongoose.connect('mongodb://mongo:27017/taskdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// 2️⃣  Define schema + model inline -----------------------------------
const messageSchema = new mongoose.Schema({
  text: { type: String, required: true },
});
const Message = mongoose.model('Message', messageSchema);

// 3️⃣  Routes ----------------------------------------------------------

// Health‑check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend & DB OK' });
});

// Save a message
app.post('/api/messages', async (req, res) => {
  try {
    const { text } = req.body;
    const saved = await new Message({ text }).save();
    res.status(201).json({ message: '✅ Message saved', data: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4️⃣  Start server ----------------------------------------------------
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
