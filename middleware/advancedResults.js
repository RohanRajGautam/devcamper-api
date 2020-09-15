const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  //copy req.query
  const reqQuery = { ...req.query };

  //fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  //loop over removeField and delete them from reqQuery
  removeFields.forEach((params) => delete reqQuery[params]);

  // create query string
  let queryStr = JSON.stringify(reqQuery);

  // create operators (gt, lt, gte, lte)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // finding resources
  query = model.find(JSON.parse(queryStr));

  //select fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  //pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();

  // pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  query = query.skip(startIndex).limit(limit);

  //populate the data
  if (populate) {
    query = query.populate(populate);
  }

  // executing query
  const result = await query;

  res.advancedResults = {
    success: true,
    count: result.length,
    pagination,
    data: result,
  };
  next();
};

module.exports = advancedResults;
