import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Notas } from "./notas.js";

export const Users = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
        
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Users.hasMany(Notas, {
    foreignKey: 'userId', 
    sourceKey: 'id'
});

Notas.belongsTo(Users, {
    foreignKey: 'userId', 
    targetKey: 'id'
});


