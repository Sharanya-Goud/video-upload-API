// seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

// Connect to the database
connectDB();

const importData = async () => {
  try {
    // Clear existing users
    await User.deleteMany();

    // Sample user data
    const users = [
      {
        name: 'Test User',
        email: 'test@example.com',
        password: '123456', // Will be hashed automatically if your schema has a pre-save hook
      },
      {
        name: 'Alice Smith',
        email: 'alice@example.com',
        password: 'alicepass',
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'bobpass',
      }
    ];

    // Insert users into the database
    for (const userData of users) {
      const user = new User(userData);
      await user.save(); // Triggers pre-save hook to hash the password
    }
    

    console.log('✅ Sample Users Imported!');
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

importData();
