const { createEventObject, createEventObjectForUpdate, validateEventFields } = require('../utils/eventUtils');
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
    const banner = req.file ? req.file.path : undefined;

    if (!banner)
      return res.status(400).json({error: 'No file attached'});

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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const futureEvents = await Event.find({ date: { $gte: today } }).sort({ date: 1 });
    const pastEvents = await Event.find({ date: { $lt: today } }).sort({ date: -1 });

    const events = {futureEvents, pastEvents};

    res.status(200).json(events);
  }catch(err){
    res.status(500).json({error: err.message});
  }
};

const getEventsByMonthController = async (req,res) => {
  try{
    const {start, end} = req.body;
    if(!start || !end)
      return res.status(400).json({error: 'No dates interval of month declared'});

    const startDate = new Date(start);
    const endDate = new Date(end);

    const eventsOfMonth = await Event.find({ date: { $gte: startDate, $lte: endDate }}).sort({ date: 1 });

    res.status(200).json(eventsOfMonth);
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
    let banner = req.file ? req.file.path : undefined;

    const validationError = validateEventFields(title, date, time, venue);
    if (validationError)
      return res.status(400).json({error: validationError.error});

    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).json({ message: 'Event not found' });

    if (req.file && event.banner)
      await deleteOldFile(event.banner);
    else
      banner = event.banner;

    const newEvent = createEventObjectForUpdate(title, date, time, venue, banner);

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
  getEventsByMonthController,
  getEventController,
  updateEventController,
  deleteEventController
};

module.exports = controllers;