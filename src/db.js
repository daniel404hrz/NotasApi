import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const {
  DB_HOST, DB_PASSWORD, DB_USER, DB_PORT, DB_NAME
} = process.env;

export const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false,
  native: false,
});

const currentFileUrl = import.meta.url;
const currentFilePath = fileURLToPath(currentFileUrl);
const currentDir = path.dirname(currentFilePath);

const modelDefiners = [];

fs.readdirSync(path.join(currentDir, './models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach(async (file) => {
    try {
      const moduleUrl = pathToFileURL(path.join(currentDir, './models', file));
      const module = await import(moduleUrl);
      modelDefiners.push(module.default);
    } catch (error) {
      console.error(`Error importing module: ${file}`, error);
    }
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

export default {
  ...sequelize.models,
  conn: sequelize,
};