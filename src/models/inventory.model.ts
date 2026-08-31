import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Inventory extends Model {
    declare id: number;
    declare warehouseId: number;
    declare medicationId: number;
    declare quantity: number;
    declare active: boolean;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Inventory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        warehouseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        medicationId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },

        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: "inventories",
        timestamps: true,

        indexes: [
            {
                unique: true,
                fields: [
                    "warehouseId",
                    "medicationId"
                ]
            }
        ]
    }
);