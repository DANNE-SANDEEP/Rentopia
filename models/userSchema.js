const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    dateOfBirth: { type: Date, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', enum: ['user', 'admin', 'manager', 'mechanic'] }, // Role field with default and enum validation
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const User = mongoose.model('User', UserSchema);

module.exports = User; // Export using CommonJS