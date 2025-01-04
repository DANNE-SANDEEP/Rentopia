const mongoose = require("mongoose");

const availableCarsSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("AvailableCar", availableCarsSchema);