const Course = require('../models/Course');
const ErrorResponse = require('../utils/errResponse');
const asyncHandler = require('../middleware/async');

// @desc      get all courses
// @routes    GET /api/v1/courses
// @routes    GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});

// @desc      Get single course
// @routes    GET /api/v1/courses/:courseId
// @access    Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await (await Course.findById(req.params.id)).populate({
    path: 'Bootcamp',
    select: 'name description',
  });

  if (!course) {
    return next(
      new ErrorResponse(`No courses with the id of ${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});
