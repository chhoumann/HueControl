/* const v3 = require('node-hue-api').v3,
      discovery = v3.discovery,
      hueApi = v3.api;
const LightState = v3.lightStates.LightState;
const fs = require('fs');

function getUsername() {
  const fileData = fs.readFileSync('./userData.json');
  const { username } = JSON.parse(fileData);
  return username;
}

async function establishConnection() {
  // Destructuring because we only need the IP address.
  const [{ ipaddress }] = await discovery.nupnpSearch();

  // Connect to the bridge with given username.
  const username = getUsername();
  const connection = await hueApi.createLocal(ipaddress).connect(username);

  return connection;
}

module.exports.getAllLights = async function getAllLights() {
  const connection = await establishConnection();

  // Get all light data
  const lightData = await connection.lights.getAll();

  // Get the data that we need and return
  let lights = [];
  lightData.forEach(light => {
    const {id, _data: {state: {on, sat, hue, bri}}} = light;
    lights.push({id, on, sat, hue, bri});
  });
  return lights;
}

module.exports.switchLight = async function switchLight(id) {
  const connection = await establishConnection();
  const parsedID = parseInt(id);
  try {
    const {_data: {state: { on }}} = await connection.lights.getLight(parsedID);

    let state = on ? new LightState().off() : new LightState().on();
    const succeed = await connection.lights.setLightState(id, state);

    return {succeed, status: !on};

  } catch(err) {console.log(err)}
} */

const huejay = require('huejay');
// Find a replacement for this.
const USERNAME = "Username";
const BRIDGE_IP = "IP";
const client = new huejay.Client({
    host: BRIDGE_IP,
    port: 80,
    username: USERNAME,
    timeout: 15000,
});

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
