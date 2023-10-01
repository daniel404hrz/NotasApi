import dotenv from 'dotenv';
dotenv.config();
import Sequelize from "sequelize";
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

export const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5000/notes`,
    { logging: false, native: false }
    );
