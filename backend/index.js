// index.js (Backend)

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
const dbURI = process.env.dbURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema and model
const UserSchema = new mongoose.Schema({
  usn: { type: String, required: true ,unique:true},
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  section: { type: String, required: true },
  branch: { type: String, required: true },
  phone: { type: String, required: true },
  sem: { type: String, required: true },
  pdfLinks: [{ type: String }], // Array of PDF links
});

const User = mongoose.model('User', UserSchema);

// ... (Add the /register endpoint below)

// Register endpoint
app.post('/signup', async (req, res) => {
  try {
    const { name, password, email, usn, section, branch, phone, sem } = req.body;

    // You can add server-side validation here if needed
    // For example, check if the username is already taken

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      password: hashedPassword,
      email,
      usn,
      section,
      branch,
      phone,
      sem,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'Sign-up successful' });
  } catch (error) {
    console.error('Sign-Up error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});
// ... (Other endpoints and routes)
// Sign-In endpoint
app.post('/login', async (req, res) => {
    try {
      const { usn, password } = req.body;
  
      // Find the user by username
      const user = await User.findOne({ usn });
  
      // If the user is not found or password is incorrect, respond with an error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Here, you can generate a JWT token for the user and send it back if needed
      res.status(200).json({ usn:user.usn ,message: 'Sign-in successful' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  // Get user profile endpoint
app.get('/user/:usn', async (req, res) => {
  try {
    const { usn } = req.params;
    console.log(usn);
    // Find the user by username
    const user = await User.findOne({ usn });
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user details excluding password
    const { password, ...userDetails } = user.toObject();
    res.json(userDetails);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// Start the server
app.listen(port, () => console.log(`Server is running on port ${port}`));
