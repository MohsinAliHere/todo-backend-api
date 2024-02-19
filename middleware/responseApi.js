// Define a response middleware
const jsonResponseMiddleware = (req, res, next) => {
    res.sendSuccess = function(data, message = 'Success') {
      res.json({ success: true, message, data });
    };
      res.sendError = function(message = 'Error', status = 400) {
      res.status(status).json({ success: false, message, data: null });
    };
    next();
  };
  


  module.exports = jsonResponseMiddleware
  