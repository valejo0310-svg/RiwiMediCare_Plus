import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class medication extends Model {
    declare id: number;
    declare name: string;
    declare description: string;
    declare active: boolean;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

medication.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false
        },

        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "medications",
        timestamps: true
    }
);