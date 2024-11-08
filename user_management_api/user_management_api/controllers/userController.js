const bcrypt = require('bcryptjs');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Storage setup for multer
const storage = multer.diskStorage({
  destination: './uploads/images',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Multer configuration for image uploads
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb('Error: Only images are allowed!');
    }
  }
}).single('image');

// Create User
exports.createUser = async (req, res) => {
  const { fullName, email, password, imagePath } = req.body;
  try {
    const user = new User({ fullName, email, password, imagePath });
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.fullName = fullName || user.fullName;
    if (password) user.password = password;
    await user.save();
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOneAndDelete({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Upload Image
exports.uploadImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err });
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    try {
      // Ensure _id is passed in the request body
      const user = await User.findById(req.body._id);
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Save the path of the uploaded file
      user.imagePath = req.file.path;
      await user.save();

      res.json({ message: 'Image uploaded successfully', path: req.file.path });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
};
