const mongoose = require('mongoose');

const availableCarsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1886, // Cars were invented in 1886
    max: new Date().getFullYear(),
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  shop: {
    type: String,
    required: true,
    trim: true,
  },
  features: {
    type: [String], // Array of strings for features
    default: [],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/.test(v);
      },
      message: props => `${props.value} is not a valid image URL!`,
    },
  },
}, { timestamps: true });

const Car = mongoose.model('Car', availableCarsSchema);

module.exports = Car;