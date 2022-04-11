const PORT = process.env.PORT || 8080;

// Creating express app
const express = require('express');
const app = express();

// allow all origins
const cors = require('cors');
app.use(cors());

// parsing incoming request body
const bodyParser = require('body-parser');
// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

// API routes
app.use('/api', require('./routes'));

// Serve application
app.use(express.static(__dirname + '/dist/library-ui'));
app.all('*', (req, res) => {
  res.status(200).sendFile(__dirname + '/dist/library-ui/index.html');
});

// mongoose connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gym');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Mongodb connected');
  app.listen(PORT, () => console.log(`Library opened on port ${PORT}`));
});