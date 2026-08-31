import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class clinics extends Model {
    declare id: number;
    declare name: string;
    declare nit: string;
    declare responsibleId: number;
    declare active: boolean;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

clinics.init(
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

        nit: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        responsibleId: {
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
        tableName: "clinics",
        timestamps: true
    }
);