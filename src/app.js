const process = require('process');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const errorHandler = require('./middleware/error-handler');

require('dotenv').config();
const port = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use('/users', require('./controllers/user.controller'));

// global error handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
