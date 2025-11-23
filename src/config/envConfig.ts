import { config } from 'dotenv';
import fs from 'node:fs';

config();

function generateEnv() {
  const env = {
    apiUrl: process.env['API_URL'] || 'http://localhost:8080/api/v1',
    imagesUrl: process.env['IMAGES_URL'] || 'http://localhost:8080/images',
    websocketUrl: process.env['WEBSOCKET_URL'] || 'http://localhost:8080/ws',
  };

  fs.writeFile(
    './src/config/env.ts',
    `/**
 * Configuration file for environment variables
 * This file is generated automatically. Do not edit manually.
 * To update the values, modify the .env file and run the build script.
 * This file don´t upload to repository.
 * But i see this file uploaded by mistake.
 * The Next projects will have this file in .gitignore.
 * If you want to ignore it, add it to your .gitignore file.
 */
export const ENV = ${JSON.stringify(env, null, 4)};\n`,
    (err) => {
      if (err) {
        console.error('Error writing env.ts file:', err);
      } else {
        console.log('env.ts file written successfully.');
      }
    }
  );
}
generateEnv();
