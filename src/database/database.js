import dotenv from 'dotenv';
dotenv.config();
import Sequelize from "sequelize";
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT,DB_NAME } = process.env;

export const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    { logging: false, native: false }
    );
