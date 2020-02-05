const ENV = process.env.NODE_ENV || 'dev';
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
const router = express.Router();

/****** MIDDLEWARES ******/
if( ENV === 'production') {
  console.log('Production Environment');
  const cors = require('cors');
  app.use(cors({ origin: 'https://pandorausa.net' }));
}
app.use(helmet());  // For security: consider csurf package later on
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', router);

/****** DB CONNECTION ******/
const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('Failed to connect: ', err));

/****** Router ******/
router.use('/api/posts', require('./routes/posts'));
router.use('/api/comments', require('./routes/comments'));
router.use('/api/links', require('./routes/links'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${ PORT }`));