const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const User = require("./models/userSchema");
const Contact = require('./models/contactSchema');
const Manager = require('./models/managerSchema');
const Car = require('./models/availableCarsSchema');
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://127.0.0.1:27017/rentopia", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Manager Routes
app.get("/api/managers", async (req, res) => {
  try {
    const managers = await Manager.find();
    res.json(managers);
  } catch (error) {
    console.error("Error fetching managers:", error);
    res.status(500).json({ errorMessage: "Error fetching managers" });
  }
});

app.post("/manager/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const manager = await Manager.findOne({ email });
    if (!manager) {
      return res.status(404).json({ errorMessage: "Manager not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, manager.password);
    if (!isPasswordValid) {
      return res.status(401).json({ errorMessage: "Invalid credentials" });
    }

    res.cookie("manager_id", manager._id, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({ 
      message: "Login successful",
      managerId: manager._id,
      branch: manager.branch 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});

app.post("/api/managers", async (req, res) => {
  try {
    const { email, branch, password } = req.body;
    
    // Check if manager already exists
    const existingManager = await Manager.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ errorMessage: "Manager with this email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new manager
    const newManager = new Manager({
      email,
      branch,
      password: hashedPassword,
      mechanics: 0,
      completedTasks: 0,
      rating: 0
    });

    await newManager.save();
    res.status(201).json({ message: "Manager added successfully" });
  } catch (error) {
    console.error("Error adding manager:", error);
    res.status(500).json({ errorMessage: "Error adding manager" });
  }
});

app.delete("/api/managers/:id", async (req, res) => {
  try {
    await Manager.findByIdAndDelete(req.params.id);
    res.json({ message: "Manager deleted successfully" });
  } catch (error) {
    console.error("Error deleting manager:", error);
    res.status(500).json({ errorMessage: "Error deleting manager" });
  }
});

// Contact Routes
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ submittedAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ errorMessage: "Error fetching contacts" });
  }
});

app.delete("/api/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: "Error deleting contact" });
  }
});

// User Routes
app.post("/signup", async (req, res) => {
  const { email, userName, dateOfBirth, password } = req.body;
  console.log('Incoming data:', req.body);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ errorMessage: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      dateOfBirth,
      password: hashedPassword,
      role: 'user',
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ errorMessage: err.message || "Internal server error" });
  }
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ errorMessage: 'All fields are required.' });
  }

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ errorMessage: 'Internal server error.' });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ errorMessage: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ errorMessage: "Invalid credentials" });
    }

    res.cookie("user_id", user._id, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorMessage: "Internal server error" });
  }
});

app.get("/api/cars", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).json({ errorMessage: "Error fetching cars" });
  }
});

//profile section update
app.get("/profile", async (req, res) => {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).json({ errorMessage: "Not authenticated" });
  }

  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ errorMessage: "User not found" });
    }

    // Return all the required profile information
    const userProfile = {
      userName: user.userName,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      role: user.role,
      createdAt: user.createdAt,
      // Add these fields to your User schema if they don't exist
      rentalCount: 0, // You can update this based on your rental tracking logic
      accountStatus: "Active", // You can make this dynamic based on user status
      rating: 0 // You can implement a rating system later
    };

    res.status(200).json(userProfile);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ errorMessage: "Error fetching profile data" });
  }
});

// Add a route to handle profile updates
app.put("/profile/update", async (req, res) => {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).json({ errorMessage: "Not authenticated" });
  }

  try {
    const updates = req.body;
    const allowedUpdates = ['userName', 'dateOfBirth']; // Add other fields that should be updatable
    
    // Filter out any fields that shouldn't be updateable
    const filteredUpdates = Object.keys(updates)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = updates[key];
        return obj;
      }, {});

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: filteredUpdates },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ errorMessage: "User not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        userName: updatedUser.userName,
        email: updatedUser.email,
        dateOfBirth: updatedUser.dateOfBirth,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt
      }
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ errorMessage: "Error updating profile" });
  }
});


// Add a new car
app.post("/api/cars", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    await newCar.save();
    res.status(201).json({ message: "Car added successfully", car: newCar });
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ errorMessage: error.message });
  }
});

// Update a car
app.put("/api/cars/:id", async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCar) {
      return res.status(404).json({ errorMessage: "Car not found" });
    }
    res.json(updatedCar);
  } catch (error) {
    console.error("Error updating car:", error);
    res.status(500).json({ errorMessage: "Error updating car" });
  }
});

// Delete a car
app.delete("/api/cars/:id", async (req, res) => {
  try {
    const deletedCar = await Car.findByIdAndDelete(req.params.id);
    if (!deletedCar) {
      return res.status(404).json({ errorMessage: "Car not found" });
    }
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ errorMessage: "Error deleting car" });
  }
});


app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.status(200).json({ message: "Logged out successfully" });
});

app.get("/profile", (req, res) => {
  const userId = req.cookies.user_id;

  if (!userId) {
    return res.status(401).json({ errorMessage: "Not authenticated" });
  }

  res.status(200).json({ message: "User is authenticated", userId });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});