const User = require('../models/User');
const ErrorResponse = require('../utils/errResponse');
const asyncHandler = require('../middleware/async');

// @desc      Register a user
// @routes    GET /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //create a user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(200).json({
    success: true,
  });
});
