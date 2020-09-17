const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  uploadPhoto,
} = require('../controllers/bootcamps');

const { protect } = require('../middleware/auth');
const Bootcamps = require('../models/Bootcamps');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const router = express.Router();

const courseRouter = require('./courses');

// Re-route into other resouce routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
  .route('/')
  .get(advancedResults(Bootcamps, 'courses'), getBootcamps)
  .post(protect, createBootcamp);

router.route('/:id/photo').put(protect, uploadPhoto);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp);

module.exports = router;
