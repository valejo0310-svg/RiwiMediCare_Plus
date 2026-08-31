import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export type RequestStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "DISPATCHED"
    | "COMPLETED";

export class SupplyRequest extends Model {
    declare id: number;
    declare clinicId: number;
    declare medicationId: number;
    declare warehouseId: number;
    declare quantity: number;
    declare status: RequestStatus;
    declare createdBy: number;
    declare active: boolean;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

SupplyRequest.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        clinicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        medicationId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        warehouseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },

        status: {
            type: DataTypes.ENUM(
                "PENDING",
                "APPROVED",
                "REJECTED",
                "DISPATCHED",
                "COMPLETED"
            ),
            allowNull: false,
            defaultValue: "PENDING"
        },

        createdBy: {
            type: DataTypes.INTEGER,
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
        tableName: "supply_requests",
        timestamps: true
    }
);