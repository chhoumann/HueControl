const lightSwitch = require('./src/lightSwitch');
const express = require('express');
const router = express.Router();

// Send all light IDs to user
router.get('/getAllLights', async (req, res) => {
  const fetchedLights = await lightSwitch.getLightStatus();
  res.send(fetchedLights);
});

router.get('/switchLight', async (req, res) => {
  const id = req.query["id"];
  const newState = await lightSwitch.lightSwitch(id);
  res.send(newState);
});

module.exports = router;
