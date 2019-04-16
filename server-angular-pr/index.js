const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const passport = require('passport');
require('./database/database')();
const port = 9999;
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use('/post', postRoutes);
app.use('/auth', authRoutes);

// General error handling
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
  next();
});
 

app.listen(port, () => { console.log(`REST API listening on port: ${port}`) });