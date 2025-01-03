const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const User = require("./models/userSchema");
const Contact = require('./models/contactSchema');

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect("mongodb://127.0.0.1:27017/rentopia", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Added Contact Routes
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

// Existing Routes
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
  console.log(`Server is running on http://localhost:${PORT}`);
});