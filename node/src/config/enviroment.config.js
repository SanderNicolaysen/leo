import fs from 'fs';

export function config () {
  // Load enviroment variables
  const load = require('dotenv').config();

  if (load.error) {
    console.error('Error: Missing .env file');
    console.log('Creating .env file - please fill out necesarry details.');
    fs.writeFileSync('.env', defaultEnv);
    process.exit();
  }

  console.log(`Running in environment: ${process.env.NODE_ENV}`);
}

const defaultEnv = `
NODE_ENV=development
WEBSERVER_PORT=8081

DB_HOST=
DB_PORT=
DB_USER=
DB_PASS=
DB_DEBUG=TRUE

ADMIN_USERNAME=leo
ADMIN_PASSWORD=secret
`;