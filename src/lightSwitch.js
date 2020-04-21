const huejay = require('huejay');
const initialSetup = require('./initialSetup');

// Loads userData file in order to get ip of bridge and username.
let client = "";
(async () => {
  const hasRunSetup = await initialSetup.hasRunSetup();
  if (hasRunSetup) {
    const {config} = hasRunSetup;
    client = new huejay.Client(config);
  }
})();

module.exports.getLightStatus = async () => {
  let lightStatuses = [];
  const lights = await client.lights.getAll()
  lights.forEach(light => {
    // Grabbing necessary data and pushing to array
    const {on, bri, hue, sat, reachable} = light.state.attributes;
    const id = parseInt(light.id);
    lightStatuses.push({id, on, bri, hue, sat, reachable});
  });
  return lightStatuses;
}

module.exports.lightSwitch = async (id) => {
  const light = await client.lights.getById(id);
  light.on = !light.on;
  const {state: {attributes: { on }}} = await client.lights.save(light);
  return on;
};

module.exports.newHue = async (newHue, id) => {
  const light = await client.lights.getById(id);
  light.hue = parseInt(newHue);
  const {state: {attributes: { hue }}} = await client.lights.save(light);
  return hue;
};

module.exports.newBrightness = async (newBrightness, id) => {
  const light = await client.lights.getById(id);
  light.brightness = parseInt(newBrightness);
  const {state: {attributes: { bri }}} = await client.lights.save(light);
  return bri;
};

module.exports.newSaturation = async (newSaturation, id) => {
  const light = await client.lights.getById(id);
  light.saturation = parseInt(newSaturation);
  const {state: {attributes: { sat }}} = await client.lights.save(light);
  return sat;
};
