const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.register= async(req, res) => {
  try {
    const user = await User.create(req.body) 
    const token = user.getSignedJwtToken()
    res.status(200).json({ 
      message: "success",
      token
    }) 
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}


exports.login = async(req, res, next) => {
  try {
    const { email, password } = req.body;
    // Validate emil & password
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide an email and password"
      })
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: "Invalid credential"
      })
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credential"
      })
    }

    const token = user.getSignedJwtToken()

    res.status(200).json({ 
      message: "success",
      token
    })
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
