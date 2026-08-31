// Imports Sequelize data types and the base Model class
// used to define the medication database model.
import { DataTypes, Model } from "sequelize";

// Imports the configured Sequelize instance
// used to connect the model with PostgreSQL.
import { sequelize } from "../config/database";

/**
 * Represents a medication registered in the system.
 *
 * Each medication contains a name, description,
 * and an active state used to control its availability.
 */
export class medication extends Model {

    // Unique identifier of the medication.
    declare id: number;

    // Name of the medication.
    declare name: string;

    // Description of the medication.
    declare description: string;

    // Indicates whether the medication is currently active.
    declare active: boolean;

    // Date when the medication record was created.
    declare readonly createdAt: Date;

    // Date when the medication record was last updated.
    declare readonly updatedAt: Date;
}

/**
 * Initializes the medication model and defines
 * its database columns and configuration.
 */
medication.init(
    {
        // Primary key of the medication table.
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        // Stores the medication name.
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Stores the medication description.
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Controls whether the medication
        // is currently active in the system.
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        // Associates the model with the configured
        // Sequelize database connection.
        sequelize,

        // Defines the database table name.
        tableName: "medications",

        // Enables automatic createdAt and updatedAt fields.
        timestamps: true
    }
);