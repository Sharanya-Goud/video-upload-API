const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ✅ Add this middleware BEFORE routes
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');  // if exists
const profileRoute = require('./routes/profileRoute');  // New profile route

// ✅ Now mount your routes
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);  // if videoRoutes exist
app.use('/api/users/profile', profileRoute);  // Mount the profile route

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});




