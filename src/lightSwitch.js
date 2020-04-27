const huejay = require('huejay');
const initialSetup = require('./initialSetup');

// Loads userData file in order to get ip of bridge and username.
let client = "";
module.exports.getBridgeClient = async () => {
  const hasRunSetup = await initialSetup.hasRunSetup();
  // If the initial setup has run, just read the data.
  // If not, then run it and try again in 150 ms.
  if (hasRunSetup) {
    const {config} = hasRunSetup;
    client = new huejay.Client(config);
    return true;
  } else {
    await initialSetup.initialSetup();
    return false;
  }
};

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
  return await client.lights.save(light);
};

module.exports.newBrightness = async (newBrightness, id) => {
  const light = await client.lights.getById(id);
  light.brightness = parseInt(newBrightness);
  return await client.lights.save(light);
};

module.exports.newSaturation = async (newSaturation, id) => {
  const light = await client.lights.getById(id);
  light.saturation = parseInt(newSaturation);
  return await client.lights.save(light);
};

module.exports.changeToColor = async (newHue, newSaturation, newBrightness, id) => {
  const light = await client.lights.getById(id);
  light.hue = parseInt(newHue);
  light.saturation = parseInt(newSaturation);
  light.brightness = parseInt(newBrightness);
  return await client.lights.save(light);
}
