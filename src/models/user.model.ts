import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export type UserRole =
    | "ADMIN"
    | "REQUEST_MANAGER";

export class users extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare role: UserRole;
    declare active: boolean;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

users.init(
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

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        role: {
            type: DataTypes.ENUM(
                "ADMIN",
                "REQUEST_MANAGER"
            ),
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
        tableName: "users",
        timestamps: true
    }
);