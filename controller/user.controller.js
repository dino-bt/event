const User = require("../models/user.model");
const mongoose = require("mongoose");
const { request } = require("../server");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

//----------------- REGISTER ---------------------------
exports.create = async (req, res) => {
  // Create and Save a user post
  //we create the body request

  try {
    const { email, password } = req.body;

    // here we create the new class that we will save

    if (!email || !password)
      return res.json({ errMessage: "please enter the correct data." });

    //installing bcrypt so that the password will be incrypted another prevention from hackers

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({
        errMessage:
          "That email has already been taken please choose another one ",
      });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // here we create the new user sub class that we will save into the data base
    const newUser = new User({
      email,
      passwordHash,
    });

    //save a new user

    const savedUser = await newUser.save();

    // res.json("thanks for signing up")
    //we generate a token and then convert it into a cookie to send back back so we can use it in the front end
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );
    console.log("inserted data");
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.log(err);
  }
};

//----------------- LOGIN -------------------------
exports.createLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if the user doesnt enter the required fields we asked them to do so over here
    if (!email || !password)
      return res.json({
        errMessage: "please enter the required fields in the imput.",
      });

    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.json({
        errMessage: "please enter the correct email or password.",
      });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.json({
        errMessage: "please enter the correct email or password.",
      });

    //we generate a token
    const token = jwt.sign(
      //will change it here to isAdmin
      {
        user: existingUser._id,
        admin: existingUser.isAdmin,
      },
      process.env.JWT_SECRET
    );
    console.log("inserted data");
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.log(err);
  }
};

exports.loggedin = async (req, res) => {
  try {
    //we need to decode the token so that we can use the user Id and send it back to the front end
    //we can then track how we are going to add userId to each post of the set to dos.
    const token = req.cookies.token;
    if (!token) return res.json({ logged: false });

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    var decoded = jwt_decode(req.cookies["token"], process.env.JWT_SECRET);

    //console.log(decoded)

    res.json({ logged: true, id: decoded.user, admin: decoded.admin });
  } catch (err) {
    console.error(err);
    res.status(false);
  }
};

//------------------------LOG OUT-------------
//here we create the logout function
//it will get request and then set cookie which will set the token to nothing
//then the date will be equal to 0 and expire and log the user out

exports.logout = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
};
