const Event = require('../models/event');

const createEventObject = (title, date, time, venue, banner) => {
  return new Event({
    title,
    date: new Date(date),
    time,
    venue,
    banner
  });
};

const createEventObjectForUpdate = (title, date, time, venue, banner) => {
  return {
    title,
    date: new Date(date),
    time,
    venue,
    banner
  };
};

const validateEventFields = (title, date, time, venue) => {

  if (!title)
    return { error: 'Title is required' };

  if (!date)
    return { error: 'Date is required' };

  if (!time)
    return { error: 'Time is required' };

  if (!venue)
    return { error: 'Venue is required' };

  if (!isValidDate(date))
    return { error: 'Invalid date format' };

  if (!isValidTime(time))
    return { error: 'Invalid time format (HH:mm)' };

  return null;
};

const isValidDate = (date) => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
};

const isValidTime = (time) => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
  return timeRegex.test(time);
};

const utils = {
  createEventObject,
  createEventObjectForUpdate,
  validateEventFields
};

module.exports = utils;