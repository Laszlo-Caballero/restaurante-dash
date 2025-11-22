import { config } from 'dotenv';
import fs from 'node:fs';

config();

function generateEnv() {
  const env = {
    apiUrl: process.env['API_URL'] || 'http://localhost:8080/api/v1',
    imagesUrl: process.env['IMAGES_URL'] || 'http://localhost:8080/images',
  };

  fs.writeFile(
    './src/config/env.ts',
    `export const ENV = ${JSON.stringify(env, null, 4)};\n`,
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
