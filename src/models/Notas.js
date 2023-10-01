import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Notas = sequelize.define('Notas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notesData: {
        type: DataTypes.JSONB,
        allowNull: false
    }

})
