// Imports Sequelize data types and the base Model class.
import { DataTypes, Model } from "sequelize";

// Imports the configured Sequelize database connection.
import { sequelize } from "../config/database";

/**
 * Defines the roles available for users in the system.
 */
export type UserRole =
    | "ADMIN"
    | "REQUEST_MANAGER";

/**
 * Represents a user registered in the system.
 *
 * Each user contains identification information,
 * authentication credentials, an assigned role,
 * and an active state.
 */
export class users extends Model {

    // Unique identifier of the user.
    declare id: number;

    // Full name of the user.
    declare name: string;

    // Unique email used for authentication.
    declare email: string;

    // Password used for authentication.
    declare password: string;

    // Role assigned to the user.
    declare role: UserRole;

    // Indicates whether the user is currently active.
    declare active: boolean;

    // Date when the user record was created.
    declare readonly createdAt: Date;

    // Date when the user record was last updated.
    declare readonly updatedAt: Date;
}

/**
 * Initializes the user model and defines
 * its database columns and configuration.
 */
users.init(
    {
        // Primary key of the users table.
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        // Stores the user's full name.
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Stores the user's email.
        // The value must be unique in the database.
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        // Stores the user's password.
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Stores the role assigned to the user.
        role: {
            type: DataTypes.ENUM(
                "ADMIN",
                "REQUEST_MANAGER"
            ),
            allowNull: false
        },

        // Controls whether the user
        // is currently active in the system.
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        // Associates the model with the configured database connection.
        sequelize,

        // Defines the database table name.
        tableName: "users",

        // Enables automatic createdAt and updatedAt fields.
        timestamps: true
    }
);