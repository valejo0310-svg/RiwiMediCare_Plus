// Imports Sequelize data types and the base Model class
// used to define the supply request database model.
import { DataTypes, Model } from "sequelize";

// Imports the configured Sequelize instance
// used to connect the model with PostgreSQL.
import { sequelize } from "../config/database";

/**
 * Defines the valid lifecycle statuses
 * available for a supply request.
 */
export type RequestStatus =
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "DISPATCHED"
    | "COMPLETED";

/**
 * Represents a medication supply request.
 *
 * Each request is associated with a clinic,
 * medication, warehouse, requested quantity,
 * current status, creator, and active state.
 */
export class SupplyRequest extends Model {

    // Unique identifier of the supply request.
    declare id: number;

    // Identifier of the clinic related to the request.
    declare clinicId: number;

    // Identifier of the requested medication.
    declare medicationId: number;

    // Identifier of the warehouse assigned to the request.
    declare warehouseId: number;

    // Quantity of medication requested.
    declare quantity: number;

    // Current lifecycle status of the supply request.
    declare status: RequestStatus;

    // Identifier of the user who created the request.
    declare createdBy: number;

    // Indicates whether the supply request is currently active.
    declare active: boolean;

    // Date when the supply request record was created.
    declare readonly createdAt: Date;

    // Date when the supply request record was last updated.
    declare readonly updatedAt: Date;
}

/**
 * Initializes the supply request model and defines
 * its database columns and configuration.
 */
SupplyRequest.init(
    {
        // Primary key of the supply request table.
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        // Stores the identifier of the related clinic.
        clinicId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        // Stores the identifier of the requested medication.
        medicationId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        // Stores the identifier of the assigned warehouse.
        warehouseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        // Stores the requested medication quantity.
        // The quantity must be at least one.
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },

        // Stores the current lifecycle status
        // of the supply request.
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

        // Stores the identifier of the user
        // who created the supply request.
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        // Controls whether the supply request
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
        tableName: "supply_requests",

        // Enables automatic createdAt and updatedAt fields.
        timestamps: true
    }
);