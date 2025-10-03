const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const { token: generateToken } = require("../Configs/JwtToken");

// account creation functions for easier things 
const userRegister = async (req, res) => {
  const { username, email, password, firstName, lastName, role = "resident" } = req.body;
  try {
    if (username && email && password) {
      //Checking user already registered in DB
      const user = await User.findOne({ email });
      //if already registered
      if (user) {
        return res
          .status(409)
          .json({ message: "User already registered. Please try login" });
      }
      
      //if not found in db proceed to create account
      const newUser = new User({ 
        username, 
        email, 
        password, 
        firstName: firstName || username, // Use username as fallback if firstName not provided
        lastName: lastName || '', // Use empty string if lastName not provided
        role 
      });
      await newUser.save();
      
      res
        .status(201)
        .json({ 
          message: "Account Created Successfully", 
          user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role
          }
        });
    } else {
      res
        .status(400)
        .json({ message: "Please Provide username, email, and password to proceed" });
    }
  } catch (error) {
    console.log("Registration error:", error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error", 
        details: Object.values(error.errors).map(err => err.message)
      });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

//user login validation with DB and create JWT token
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      //Checking user already registered in DB
      const user = await User.findOne({ email });
      //if user already registered
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found. Please register before login" });
      }
      
      //Validating password for found user
      const passwordValidation = await bcrypt.compare(
        password,
        user.password
      );
      
      if (passwordValidation) {
        const token = await generateToken(user);
        
        // Set HTTP-only cookie for security
        res.cookie('authToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          path: '/'
        });
        
        // Set user data in a separate cookie
        const userData = {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName || user.username,
          lastName: user.lastName || '',
          role: user.role
        };
        
        res.cookie('userData', JSON.stringify(userData), {
          httpOnly: false,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          path: '/'
        });
        
        res
          .status(200)
          .json({ 
            message: "Login Successfully", 
            token: token,
            userid: user._id,
            role: user.role,
            firstName: user.firstName || user.username,
            lastName: user.lastName || '',
            username: user.username,
            email: user.email
          });
      } else {
        res
          .status(401)
          .json({ message: "Unauthorized. Check login credentials" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Please Provide email and password to proceed" });
    }
  } catch (error) {
    console.log("Login error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

//user dashboard 
const userDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ 
      message: "User dashboard", 
      user 
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout function
const userLogout = async (req, res) => {
  try {
    // Clear cookies
    res.clearCookie('authToken');
    res.clearCookie('userData');
    
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  userDashboard,
  userLogout,
  getCurrentUser
};
