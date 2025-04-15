const express = require('express');
const upload = require('../middleware/upload');
const { logBrowserController,
        addEventController,
        getAllEventsController,
        getEventsByMonthController,
        getEventController,
        updateEventController,
        deleteEventController } = require('../controllers/eventController');

const router = express.Router();

router.get('/', logBrowserController);
router.post('/events/', upload.single('banner'), addEventController);
router.get('/events/', getAllEventsController);
router.post('/events/byMonth', getEventsByMonthController);
router.get('/events/:id', getEventController);
router.put('/events/:id', upload.single('banner'), updateEventController);
router.delete('/events/:id', deleteEventController);

module.exports = router;