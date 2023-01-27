const express = require('express');
const bodyParser = require('body-parser');
const imagesRouter = require('./routes/images.routes.js');
const cors = require('cors');
// Create app
const app = express();



// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cors
app.use(cors());
// Routes

app.use('/images', imagesRouter);


// Export app

module.exports = app;