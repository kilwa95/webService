const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const Event = require('./models/Event');


const app = express();
app.use(bodyParser.json());

app.post("/events",async (req, res) => {
    const event = req.body;
    const eventcreate = new Event(event);
    await eventcreate.save();
    axios.post("http://172.22.0.11:4001/events", event).catch((err) => {
      console.log(err.message);
    });
    axios.post("http://172.22.0.12:4242/events", event).catch((err) => {
      console.log(err.message);
    });
    axios.post("http://172.22.0.10:4002/events", event).catch((err) => {
      console.log(err.message);
    });
    axios.post("http://172.22.0.3:8443/api/events", event).catch((err) => {
      console.log(err.message);
    });
  });

app.get("/events", async (req, res) => {
  const events = await Event.findAll({});
  res.json(events); 
});

  const port = process.env.PORT || 4005;
  app.listen(port, () => {
      console.log(`Starting : http://localhost:${port}`);
  });