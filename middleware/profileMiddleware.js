const checkProfileComplete = (req, res, next) => {
  console.log("Check Profile Middleware Triggered"); // Log to see if the middleware is being hit

  // Check if the user object exists and if the profile fields are complete
  if (!req.user || !req.user.profile) {
    console.log("User or profile is missing:", req.user); // Log if user or profile is missing
    return res.status(400).json({ message: 'Profile is incomplete, please complete your profile' });
  }

  // Log the user profile to check its contents
  console.log("User Profile:", req.user.profile);  

  // Check specific fields (e.g., name, profile picture, address)
  if (!req.user.profile.name || !req.user.profile.picture || !req.user.profile.address) {
    console.log("Incomplete profile fields:", req.user.profile); // Log the incomplete fields
    return res.status(400).json({ message: 'Profile fields are incomplete' });
  }

  // If all required fields are complete, proceed to the next middleware/handler
  console.log("Profile complete, proceeding to next middleware.");
  next();
};

module.exports = { checkProfileComplete };
