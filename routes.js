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

router.get('/hueChange', async (req, res) => {
  const {newHue, id} = req.query;
  const newState = await lightSwitch.newHue(newHue, id);
  res.end(`${newState}`);
});

router.get('/brightnessChange', async (req, res) => {
  const {newBrightness, id} = req.query;
  const newState = await lightSwitch.newBrightness(newBrightness, id);
  res.end(`${newState}`);
});

router.get('/saturationChange', async (req, res) => {
  const {newSaturation, id} = req.query;
  const newState = await lightSwitch.newSaturation(newSaturation, id);
  res.end(`${newState}`);
});


module.exports = router;
