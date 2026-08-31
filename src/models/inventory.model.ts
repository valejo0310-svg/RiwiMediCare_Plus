import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Inventory extends Model {
    declare id: number;
    declare warehouseId: number;
    declare medicationId: number;
    declare quantity: number;
    declare active: boolean;
}

Inventory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        warehouseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "warehouses",
                key: "id"
            }
        },

        medicationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "medications",
                key: "id"
            }
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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
        paranoid: true,
        indexes: [
            {
                unique: true,
                fields: ["warehouseId", "medicationId"]
            }
        ]
    }
);