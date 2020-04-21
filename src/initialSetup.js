const huejay = require('huejay');
const fs = require('fs');
const filePath = './userData.json';

// Detech bridge IP - assuming that there only is one bridge in the household.
async function detectBridgeIP() {
  try {
    const [{ ip }] = await huejay.discover();
    return ip;
  } catch(error) {
    console.log(error);
  }
}

// Create a new user
async function createNewUser() {
  let client = new huejay.Client({ host: await detectBridgeIP() })
  let tempUser = new client.users.User;
  tempUser.deviceType = 'huecontrol';

  try {
    const {username} = await client.users.create(tempUser);
    return username;
  } catch(error) {
    // Check if link button was pressed
    if (error instanceof huejay.Error && error.type === 101) {
      return false;
    }
    console.log(error.stack);
  }
}

async function writeToUserFile(client) {
  return await fs.writeFile(filePath, JSON.stringify(client), (error, data) => { if (error) console.log(error) });
}

module.exports.initialSetup = async function initialSetup() {
  // Get the bridge IP
  const bridgeIP = await detectBridgeIP();

  // Create new user and get username
  const username = await createNewUser();

  // User did not press link button or no bridge found.
  // Use this to display error message on the screen.
  if (username === false || bridgeIP === undefined) {
    return false;
  }

  // Make the client
  const client = new huejay.Client({
    host: bridgeIP,
    port: 80,
    username,
  })

  // Write to file / DB
  return await writeToUserFile(client);
}

// Check if the userData file exists. If it does, return contents of file, else return false.
module.exports.hasRunSetup = async function hasRunSetup() {
  let data;
  try {
    data = await fs.readFileSync(filePath);
  }
  catch (error) {
    // Can't read file
    console.error(error.message);
    return false;
  }
  finally {
    // Parse read data and extract important bits.
    const parsedData = JSON.parse(data);
    const {config: { host, username }} = parsedData;

    // Check for errors in data
    if (host === undefined || host === '' || username === undefined || username === '') {
      return false;
    }

    return parsedData;
  }
}

