const lightSwitch = require('./src/lightSwitch');
const express = require('express');
const router = express.Router();

// Get client
router.get('/getBridgeClient', async (req, res) => {
  const readyStatus = await lightSwitch.getBridgeClient();
  res.send({readyStatus});
})

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

router.post('/hueChange', async (req, res) => {
  const {newHue, id} = req.body;
  await lightSwitch.newHue(newHue, id);
  res.end();
});

router.post('/brightnessChange', async (req, res) => {
  const {newBrightness, id} = req.body;
  await lightSwitch.newBrightness(newBrightness, id);
  res.end();
});

router.post('/saturationChange', async (req, res) => {
  const {newSaturation, id} = req.body;
  await lightSwitch.newSaturation(newSaturation, id);
  res.end();
});

router.post('/changeToColor', async (req, res) => {
  const {id, hue, sat, bri} = req.body;
  await lightSwitch.changeToColor(hue, sat, bri, id);
  res.end();
})

module.exports = router;
