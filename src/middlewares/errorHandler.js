const errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Paksa semua yang bukan 'success' menjadi 'failed' agar lulus test
  res.status(statusCode).json({ 
    status: 'failed', 
    message 
  });
};

module.exports = errorHandler;