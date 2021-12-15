var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const vacationRouter = require('./routes/vacation');
const userRoutes = require('./routes/user');
// const orderRoutes = require('./routes/order');
mongoose.connect(
  `mongodb+srv://hadar:hadar@shop.ob85s.mongodb.net/Vacation-project?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on('connected', () => {
  console.log('mongoDB Connected!');
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Authorization'
  );
  // res.header('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    return res.status(200).json({});
  }
  next();
});
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/vacations', vacationRouter);
app.use('/user', userRoutes);
// app.use('/order', orderRoutes);
// app.use('/token')
module.exports = app;
