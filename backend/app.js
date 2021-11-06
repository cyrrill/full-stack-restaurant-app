const dotenv = require('dotenv');
dotenv.config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const mongo = require('./services/mongo');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const restaurantsRouter = require('./routes/restaurants');
const checkoutRouter = require('./routes/checkout');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/checkout', checkoutRouter);
app.use('/users', usersRouter);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const error = req.app.get('env') === 'development' ? err : {};
  res.status(error.status || 500).send(error);
});

module.exports = app;
