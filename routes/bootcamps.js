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
const Bootcamps = require('../models/Bootcamps');

const { protect, authorize } = require('../middleware/auth');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const router = express.Router();

const courseRouter = require('./courses');
const reviewRouter = require('./reviews');

// Re-route into other resouce routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
  .route('/')
  .get(advancedResults(Bootcamps, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router.route('/:id/photo').put(protect, uploadPhoto);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;
