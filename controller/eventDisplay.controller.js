const EventDisplay = require("../models/eventDisplay.model");
const mongoose = require("mongoose");
const { request } = require("../server");

const { find } = require("../models/eventDisplay.model");
//ths creates a post for eventDisplay
exports.eventDisplayPost = async (req, res) => {
  try {
    const { headerText, bodyText } = req.body;

    const newEventDisplay = new EventDisplay({
      headerText,
      bodyText,
    });

    const savedEventDisplay = await newEventDisplay.save();

    res.json(savedEventDisplay);
  } catch (err) {
    console.log(err);
  }
};
//this will delete the eventDisplay
exports.deleteEventDisplay = async (req, res) => {
  let id = req.params.id;

  try {
    await EventDisplay.findByIdAndRemove(id);
    res.json(id);
    console.log(id);
    console.log(" event removed");
  } catch (err) {
    console.log("ERROR: event not removed. " + err);
  }
};
//this will get eventdisplay list from the database
exports.eventDisplayGet = async (req, res) => {
  try {
    const eventsDisplay = await EventDisplay.find();
    res.json(eventsDisplay);
  } catch (err) {
    console.log(err);
  }
};

//this will update event display

exports.updateEventDisplay = async (req, res) => {
  let id = req.params.id;

  let newHeaderText = req.body.newHeaderText;
  let newBodyText = req.body.newBodyText;

  try {
    await EventDisplay.findById(id, (err, updateEventDisplay) => {
      updateEventDisplay.headerText = newHeaderText;
      updateEventDisplay.bodyText = newBodyText;

      updateEventDisplay.save();

      res.send(updateEventDisplay);
    });
  } catch (err) {
    console.log(err);
  }
};
