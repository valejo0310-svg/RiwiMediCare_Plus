// Imports Sequelize data types and the base Model class
// used to define the inventory database model.
import { DataTypes, Model } from "sequelize";

// Imports the configured Sequelize instance
// used to connect the model with PostgreSQL.
import { sequelize } from "../config/database";

/**
 * Represents the inventory available in a warehouse.
 *
 * Each inventory record links a warehouse with a medication
 * and stores the available quantity for that combination.
 */
export class Inventory extends Model {

    // Unique identifier of the inventory record.
    declare id: number;

    // Identifier of the warehouse related to the inventory.
    declare warehouseId: number;

    // Identifier of the medication related to the inventory.
    declare medicationId: number;

    // Available quantity of the medication in the warehouse.
    declare quantity: number;

    // Indicates whether the inventory record is currently active.
    declare active: boolean;

    // Date when the inventory record was created.
    declare readonly createdAt: Date;

    // Date when the inventory record was last updated.
    declare readonly updatedAt: Date;
}

/**
 * Initializes the inventory model and defines
 * its database columns and configuration.
 */
Inventory.init(
    {
        // Primary key of the inventory table.
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        // Stores the identifier of the related warehouse.
        warehouseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        // Stores the identifier of the related medication.
        medicationId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        // Stores the available medication quantity.
        // The quantity cannot be lower than zero.
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },

        // Controls whether the inventory record
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
        tableName: "inventories",

        // Enables automatic createdAt and updatedAt fields.
        timestamps: true,

        // Prevents duplicate inventory records for the same
        // warehouse and medication combination.
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