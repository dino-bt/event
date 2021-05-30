//this is acting as our middleware route before it wil be used in the controller
//we can detect if the user has or has not a token by creating the variable below and using
//the cookie-parser that we downloaded

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    //here we check if the user has a token if not they cant go any further
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });
    //if the do have the token we can go to the next step
    //we need to check if the token is verified and matches the password that we created the JWT SECRET in the .env file
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    //this will assign the request of the user to an id

    req.user = verified.user;
    //we then use the next function to carry on the function.

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
};

module.exports = auth;
