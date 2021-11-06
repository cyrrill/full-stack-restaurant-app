// https://regbrain.com/article/cache-headers-express-js

module.exports = function (req, res, next) {

  // you only want to cache for GET requests
  if (req.method === 'GET') {
    res.set('Cache-control', `public, max-age=3600`);
  } else {
    // for the other requests set strict no caching parameters
    res.set('Cache-control', `no-store`);
  }

  next();
}