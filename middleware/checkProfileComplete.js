module.exports = (req, res, next) => {
  console.log("User object in checkProfileComplete:", req.user);  // Log the entire user object
  
  const { phone, country, dateOfBirth } = req.user;

  if (!phone || !country || !dateOfBirth) {
    console.log("Incomplete profile data:", { phone, country, dateOfBirth });
    return res.status(400).json({
      message: "Complete your profile before making a withdrawal."
    });
  }

  next();
};
