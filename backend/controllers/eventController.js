const { createEventObject, validateEventFields } = require('../utils/eventUtils');
const { deleteOldFile } = require('../utils/fileUtils');
const Event = require('../models/event');
const multer = require("multer");

const logBrowserController = async (req, res) => {
  try{
    res.status(200).send('Welcome on board explorer');
  }catch(err){
    res.status(500).send('Internal Server Error');
  }
};

const addEventController = async (req,res) => {
  try{
    const {title, date, time, venue} = req.body;
    const banner = req.file ? req.file.path : null;

    const validationError = validateEventFields(title, date, time, venue);
    if (validationError)
      return res.status(400).json({error: validationError.error});

    const newEvent = createEventObject(title, date, time, venue, banner);
    const addedEvent = await newEvent.save();

    res.status(201).json(addedEvent);
  }catch(err){
    if (err instanceof multer.MulterError)
      return res.status(400).json({error: `Multer error: ${err.message}`});

    res.status(500).json({error: err.message});
  }
};

const getAllEventsController = async (req,res) => {
  try{
    const events = await Event.find();

    res.status(200).json(events);
  }catch(err){
    res.status(500).json({error: err.message});
  }
};

const getEventController = async (req,res) => {
  try{
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({message: 'Event not found'});

    res.status(200).json(event);
  }catch(err){
    res.status(500).json({error: err.message});
  }
};

const updateEventController = async (req,res) => {
  try{
    const {title, date, time, venue} = req.body;
    const banner = req.file ? req.file.path : req.body.banner;

    const validationError = validateEventFields(title, date, time, venue);
    if (validationError)
      return res.status(400).json({error: validationError.error});

    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: 'Event not found' });

    if (req.file && event.banner && (event.banner !== banner))
      await deleteOldFile(event.banner);

    const newEvent = createEventObject(title, date, time, venue, banner);

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      newEvent,
      {new: true, runValidators: true}
    );

    if (!updatedEvent)
      return res.status(404).json({message: 'Event not found'});

    res.status(200).json(updatedEvent);
  }catch(err) {
    if (err instanceof multer.MulterError)
      return res.status(400).json({error: `Multer error: ${err.message}`});

    res.status(500).json({error: err.message});
  }
};

const deleteEventController = async (req,res) => {
  try{
    const event = await Event.findById(req.params.id);

    if (!event)
      return res.status(404).json({ message: 'Event not found' });

    if (event.banner)
      await deleteOldFile(event.banner);

    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent)
      return res.status(404).json({message: 'Event not found'});

    res.status(200).json({message: `Event deleted successfully`});
  }catch(err) {
    res.status(500).json({error: err.message});
  }
};

const controllers = {
  logBrowserController,
  addEventController,
  getAllEventsController,
  getEventController,
  updateEventController,
  deleteEventController
};

module.exports = controllers;