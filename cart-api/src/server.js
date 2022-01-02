const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
var cors = require('cors');
const routes = require('./routes');
const app = express();
module.exports = app;
const axios = require("axios");

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // for “Content-Type: application/x-www-form-urlencoded”,
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
app.use(bodyParser.json());
app.use(cors());
app.use('/', routes);
app.use((req, res, next) => {
    res.status(404).json({
      status: 404,
      message: 'Route not found',
    });
    next();
  });

app.on('close', () => {});


const handleEvent = (type, data) => {
};


const port = process.env.PORT || 4001;
app.listen(port, async () => {
    console.log(`Starting : http://localhost:${port}`);
    try {
      const result = await axios.get("http://172.22.0.10:4005/events");
      for (let event of result.data) {
        handleEvent(event.type, event.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  });

module.exports = app;
