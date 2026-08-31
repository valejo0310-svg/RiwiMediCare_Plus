// Imports Sequelize data types and the base Model class.
import { DataTypes, Model } from "sequelize";

// Imports the configured Sequelize database connection.
import { sequelize } from "../config/database";

/**
 * Represents a warehouse registered in the system.
 *
 * Each warehouse contains identification information,
 * a physical location, and an active state.
 */
export class warehouse extends Model {

    // Unique identifier of the warehouse.
    declare id: number;

    // Name of the warehouse.
    declare name: string;

    // Physical location of the warehouse.
    declare location: string;

    // Indicates whether the warehouse is currently active.
    declare active: boolean;

    // Date when the warehouse record was created.
    declare readonly createdAt: Date;

    // Date when the warehouse record was last updated.
    declare readonly updatedAt: Date;
}

/**
 * Initializes the warehouse model and defines
 * its database columns and configuration.
 */
warehouse.init(
    {
        // Primary key of the warehouses table.
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        // Stores the warehouse name.
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Stores the physical location of the warehouse.
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Controls whether the warehouse
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
        tableName: "warehouses",

        // Enables automatic createdAt and updatedAt fields.
        timestamps: true
    }
);