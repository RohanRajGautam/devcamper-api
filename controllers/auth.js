const User = require('../models/User');
const ErrorResponse = require('../utils/errResponse');
const asyncHandler = require('../middleware/async');

// @desc      Register a user
// @routes    GET /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
  });
});
