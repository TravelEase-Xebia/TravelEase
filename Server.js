const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require("cors");
 
dotenv.config();
const app = express();
app.use(cors()); 

app.use(express.json());
app.use('/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.get('/health', (req, res) => res.send('Login Service Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Login service running on port ${PORT}`));


app.get("/", (req, res) => {
      res.send("Hello World!");
    });
