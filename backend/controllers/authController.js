const User = require("../models/User");

// Register
exports.register = async (req, res) => {
  try {
    console.log("Incoming register request:", req.body);

    const { fullName, email, password } = req.body;

    // Validate request body
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const newUser = new User({
      fullName,
      email,
      password,
    });

    await newUser.save();
    console.log("User saved to database:", newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        fullName: newUser.fullName,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Login
exports.login = async (req, res) => {
  try {
    console.log("Incoming login request:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    res.status(200).json({
      message: "Login successful",
      fullName: user.fullName,
      email: user.email,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Forgot Password
exports.forgotPassword = async (req, res) => {
  try {
    console.log("Forgot password request:", req.body);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Password reset link sent to your email",
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};