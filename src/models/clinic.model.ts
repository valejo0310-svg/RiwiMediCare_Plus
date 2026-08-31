// Imports Sequelize data types and the base Model class
// used to define the clinic database model.
import { DataTypes, Model } from "sequelize";

// Imports the configured Sequelize instance
// used to connect the model with PostgreSQL.
import { sequelize } from "../config/database";

/**
 * Represents a clinic registered in the system.
 *
 * Each clinic contains identification information,
 * a responsible user, and an active state used
 * to control its availability in the application.
 */
export class clinics extends Model {

    // Unique identifier of the clinic.
    declare id: number;

    // Name of the clinic.
    declare name: string;

    // Unique tax identification number of the clinic.
    declare nit: string;

    // Identifier of the user responsible for the clinic.
    declare responsibleId: number;

    // Indicates whether the clinic is currently active.
    declare active: boolean;

    // Date when the clinic record was created.
    declare readonly createdAt: Date;

    // Date when the clinic record was last updated.
    declare readonly updatedAt: Date;
}

/**
 * Initializes the clinic model and defines
 * its database columns and configuration.
 */
clinics.init(
    {
        // Primary key of the clinic table.
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        // Stores the clinic name.
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        // Stores the clinic tax identification number.
        // The value must be unique in the database.
        nit: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        // Stores the identifier of the user
        // responsible for the clinic.
        responsibleId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        // Controls whether the clinic
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
        tableName: "clinics",

        // Enables automatic createdAt and updatedAt fields.
        timestamps: true,

        // Enables Sequelize paranoid mode.
        paranoid : true
    }
);